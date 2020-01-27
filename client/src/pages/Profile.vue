<template>
  <div>
    <h2>Profile Page</h2>
    <p>{{ localmsg }}</p>
    <h3>Username: {{ username }}</h3>
    <h3>Email: {{ email }}</h3>
    <!-- <h3>Country: {{ country }}</h3> -->
    <b-row no-gutters>
      <b-col md="6">
        <h3>Favorites</h3>
        <div v-if="favorites.length > 0">
          <div id="articlelist">
            <li v-for="favorite in favorites" :key="favorite.id">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <a :href="favorite.articleURL"
                  ><b-card-body id="title" v-bind:title="favorite.articleTitle">
                  </b-card-body>
                </a>
              </b-card>
            </li>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <h3>History</h3>
        <div v-if="history.length > 0">
          <div id="articlelist">
            <li v-for="article in history" :key="article.articleURL">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <a :href="article.articleURL">
                  <b-card-body id="title" v-bind:title="article.articleTitle">
                  </b-card-body>
                </a>
              </b-card>
            </li>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      email: '',
      history: [],
      favorites: [],
      country: '',
      localmsg: ''
    };
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login');
      this.$router.go();
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/user/profile',
      params: {
        userId: this.$session.get('userId')
      },
      responseType: 'json'
    })
      .then(res => {
        if (res.data) {
          this.username = res.data.oneUser.username;
          this.email = res.data.oneUser.email;

          for (let hist of res.data.history) {
            if (hist != null)
            this.history.push(hist);
          }

          for (let fav of res.data.favorites) {
            if (fav != null)
            this.favorites.push(fav);
          }
        } else {
          this.localmsg = 'Profile not found!';
        }
      })
      .catch
      //this.localmsg = err;
      ();
  }
};
</script>

<style>
#title {
  font-weight: 700;
  font-size: 1.65em;
  font-family: 'Roboto', sans-serif;
  color: #000;
  text-decoration: none !important;
  text-align: left;
}
#desc {
  font-weight: 100;
  font-size: 0.65em;
}
p {
  margin: 0 auto;
}
</style>
