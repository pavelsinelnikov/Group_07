<template>
  <div>
    <h2>Profile Page</h2>
    <p>{{ localmsg }}</p>
    <h3>Username: {{ username }}</h3>
    <h3>Email: {{ email }}</h3>
    <b-row no-gutters>
      <b-col md="6">
        <h3>Favorites</h3>
        <div v-if="favorites.length > 0">
          <div id="articlelist">
            <li v-for="favorite in favorites" :key="favorite.article">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <b-row no-gutters>
                  <b-col md="12">
                    <b-card-body id="title" v-bind:title="favorite.article">
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </li>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <h3>History</h3>
        <div v-if="history.length > 0">
          <div id="articlelist">
            <li v-for="article in history" :key="article.url">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <b-row no-gutters>
                  <b-col md="12">
                    <b-card-body id="title" v-bind:title="article.title">
                    </b-card-body>
                  </b-col>
                </b-row>
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
    //console.log(this.$session.getAll());
    axios({
      method: 'get',
      url: 'http://localhost:3000/user/profile',
      params: {
        email: this.$session.get('email')
      },
      responseType: 'json'
    })
      .then(res => {
        if (res.data) {
          //this.localmsg = res.data;
          this.username = res.data.oneUser.username;
          this.email = res.data.oneUser.email;

          for (let hist of res.data.oneUser.history) {
            this.history.push(JSON.parse(hist));
          }

          for (let fav of res.data.article){
            this.favorites.push(fav);
          }

          // this.favorites = JSON.parse(res.data.oneUser.favorites);
        } else {
          this.localmsg = 'Profile not found!';
        }
      })
      .catch(err => {
        this.localmsg = err;
      });
  }
};
</script>

<style>
#articlelist {
  list-style-type: none;
  max-height: 40vw;
  overflow: scroll;
}
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
