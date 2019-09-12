<template>
  <div>
    <form @submit.prevent>
      <!--TODO: Add search terms -->
      <input v-model="localmsg" />
      <select v-model="selectedCountry">
        <option disabled value>Select a country...</option>
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.code"
          >{{ country.name }}</option
        >
      </select>
      <button @click="fetchDataFromNewsAPI()">Send</button>
    </form>
    <ul>
      <li v-for="response in newsResponse" :key="response.id">
        {{ response.result.title }}
        <button @click="deleteMessage(response.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      localmsg: '',
      newsIndex: 0,
      selectedCountry: '',
      newsResponse: [],
      countries: [
        { id: 1, name: 'United Arab Emirates', code: 'ae' },
        { id: 2, name: 'Argentina', code: 'ar' },
        { id: 3, name: 'Austria', code: 'at' }
      ]
    };
  },
  methods: {
    fetchDataFromNewsAPI() {
      // Empty an array
      this.newsResponse.length = 0;
      this.newsIndex = 0;
      // Will only retrieve preset data
      var url =
        'https://newsapi.org/v2/top-headlines?' +
        'q=' +
        this.localmsg +
        '&' +
        'country=' +
        this.selectedCountry +
        '&' +
        'sortBy=popularity&' +
        // API Key will be given in a separate file not included in git
        // I would suggest making your own one for now
        'apiKey=' +
        `${process.env.VUE_APP_NEWS_API}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          let value = data.articles;
          value.map(result => {
            // TODO: Change id field to something better rather than a count
            this.newsResponse.push({ id: this.newsIndex++, result: result });
          });
        });
    },
    deleteMessage(respId) {
      let index = this.newsResponse.findIndex(x => x.id == respId);
      this.newsResponse.splice(index, 1);
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
</style>
