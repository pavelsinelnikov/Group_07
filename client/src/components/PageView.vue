<template>
  <div>
    <div class="embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" :src="article.articleURL"></iframe>
    </div>
    <div>
      <h3>Comments</h3>
      <ul v-for="comment in comments" :key="comment.id">
        <li v-if="userId === comment.RegisteredUserId">
          <div v-if="!editState">
            <p>
              {{comment.RegisteredUser.username}} {{comment.updatedAt}} {{comment.text}}
              <button
                @click="toggleEditState(); setCurrentComment(comment.id, comment.text);"
              >edit</button>
              <button @click="setCurrentComment(comment.id, comment.text); deleteComment()">Delete</button>
            </p>
          </div>
          <div v-else-if="editState && currentComment.id === comment.id">
            <p>
              {{comment.RegisteredUser.username}} {{comment.updatedAt}}
              <input
                v-model="currentComment.text"
              />
              <button @click="toggleEditState(); editComment()">submit</button>
            </p>
          </div>
          <div v-else>
            <p>
              {{comment.updatedAt}} {{comment.text}}
              <button
                @click="setCurrentComment(comment.id, comment.text);"
              >edit</button>
            </p>
          </div>
        </li>
        <li v-else>{{comment.RegisteredUser.username}} {{comment.updatedAt}} {{comment.text}}</li>
      </ul>

      <div v-if="userId !== 0">
        <textarea v-model="text"></textarea>
        <button @click="addComment">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
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
      text: "",
      editState: false,
      userId: 0,
      editText: "",
      currentComment: {
        id: 0,
        text: ""
      }
    };
  },
  mounted() {
    if (this.$session.exists()) {
      this.userId = this.$session.get("userId");
    }
  },
  methods: {
    addComment() {
      if (this.$session.exists()) {
        let url =
          "http://localhost:3000/article/" + this.articleId + "/comments";
        axios({
          method: "POST",
          url: url,
          data: {
            userId: this.userId,
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

    editComment() {
      if (this.$session.exists()) {
        let url =
          "http://localhost:3000/comment/comments/" + this.currentComment.id;
        axios({
          method: "PUT",
          url: url,
          data: {
            userId: this.userId,
            text: this.currentComment.text
          }
        })
          .then(res => {
            this.currentComment.text = "";
            this.infomsg = res.data;
            this.getComments();
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    },

    deleteComment() {
      if (this.$session.exists()) {
        let url =
          "http://localhost:3000/comment/comments/" + this.currentComment.id;
        axios({
          method: "DELETE",
          url: url
        })
          .then(res => {
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
    },

    toggleEditState(text) {
      this.editState = !this.editState;
      this.editText = text;
    },

    setCurrentComment(id, text) {
      this.currentComment.id = id;
      this.currentComment.text = text;
    }
  }
};
</script>

<style>
iframe {
  height: 70vh;
}

li {
  list-style: none;
  text-align: left;
}
</style>
