<template>
  <div>
    <div class="embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" :src="article.articleURL"></iframe>
    </div>
    <div>
      <h3>Comments</h3>
      <ul v-for="comment in comments" :key="comment.id">
        <li>{{comment.text}}</li>
      </ul>

      <textarea v-model="text"></textarea>
      <button @click="addComment">Comment</button>
    </div>
  </div>
</template>

<script>
// DETECT THAT THE PROPS CHANGE AND CALL THE METHOD EVERY TIME
import axios from "axios";
export default {
  name: "PageView",
  props: ["articleId"],
  watch: {
    articleId() {
      this.getArticle();
    }
  },
  data() {
    return {
      comments: [],
      article: {},
      text: ""
    };
  },
  mounted() {},
  methods: {
    addComment() {
      if (this.$session.exists()) {
        let url =
          "http://localhost:3000/article/" + this.articleId + "/comments";
        axios({
          method: "POST",
          url: url,
          data: {
            userId: this.$session.get("userId"),
            text: this.text
          }
        })
          .then(res => {
            this.text = "";
            this.infomsg = res.data;
            this.getComments();
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    },

    getComments() {
      let url = "http://localhost:3000/article/" + this.articleId + "/comments";
      axios({
        method: "GET",
        url: url
      })
        .then(res => {
          this.comments = res.data;
        })
        .catch(err => {
          this.infomsg = err;
        });
    },

    getArticle() {
      let url = "http://localhost:3000/article/articles/" + this.articleId;
      axios({
        method: "GET",
        url: url
      })
        .then(res => {
          this.article = res.data;
          this.getComments();
        })
        .catch(err => {
          this.infomsg = err;
        });
    }
  }
};
</script>

<style>
iframe {
  height: 70vh;
}
</style>
