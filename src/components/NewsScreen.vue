<template>
  <div>
    <form @submit.prevent>
      <!--TODO: Add search terms -->
      <input v-model="localmsg" /><button @click="fetchDataFromNewsAPI()">
        Send
      </button>
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
      newsResponse: [],
    };
  },
  methods: {
    fetchDataFromNewsAPI() {
      // Will only retrieve preset data
      var url =
        'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2019-05-22&' +
        'sortBy=popularity&' +
        // API Key will be given in a separate file not included in git
        // I would suggest making your own one for now
        'apiKey=' +
        `${process.env.VUE_APP_NEWSAPI_API}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          let value = data.articles;
          value.map(result => {
            // TODO: Change id field to something better rather than a count
            this.newsResponse.push({id: this.newsIndex++, result: result});
          });
        });
    },
    deleteMessage(respId) {
      let index = this.newsResponse.findIndex(x => x.id == respId);
      this.newsResponse.splice(index, 1);
    },
  },
};
</script>
