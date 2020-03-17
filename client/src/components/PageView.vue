<template>
  <div>
    <div v-if="!loading">
      <div
        v-if="unblocked && !textError"
        class="embed-responsive"
        ref="articleDiv"
      >
        <!-- <iframe class="embed-responsive-item" :src="article.articleURL"></iframe> -->
        <div v-html="title"></div>
        <div v-for="(body, index) in content" :key="index">
          <div class="body" v-html="body"></div>
        </div>
      </div>
      <div v-else ref="linkDiv">
        <a :href="article.articleURL">Article Link</a>
      </div>
      <div>
        <h3>Comments</h3>
        <ul v-for="comment in comments" :key="comment.id">
          <li v-if="userId === comment.RegisteredUserId">
            <div v-if="!editState">
              <p>
                {{ comment.RegisteredUser.username }} {{ comment.updatedAt }}
                {{ comment.text }}
                <button
                  @click="
                    toggleEditState();
                    setCurrentComment(comment.id, comment.text);
                  "
                >
                  edit
                </button>
                <button
                  @click="
                    setCurrentComment(comment.id, comment.text);
                    deleteComment();
                  "
                >
                  Delete
                </button>
              </p>
            </div>
            <div v-else-if="editState && currentComment.id === comment.id">
              <p>
                {{ comment.RegisteredUser.username }} {{ comment.updatedAt }}
                <input v-model="currentComment.text" />
                <button
                  @click="
                    toggleEditState();
                    editComment();
                  "
                >
                  submit
                </button>
              </p>
            </div>
            <div v-else>
              <p>
                {{ comment.updatedAt }} {{ comment.text }}
                <button @click="setCurrentComment(comment.id, comment.text)">
                  edit
                </button>
              </p>
            </div>
          </li>
          <li v-else>
            {{ comment.RegisteredUser.username }} {{ comment.updatedAt }}
            {{ comment.text }}
          </li>
        </ul>

        <div v-if="userId !== 0">
          <textarea v-model="text"></textarea>
          <button @click="addComment">Comment</button>
        </div>
      </div>
      <p>{{ text }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//const Nightmare = require('nightmare');
export default {
  name: 'PageView',
  props: ['articleId'],
  watch: {
    articleId() {
      this.getArticle();
    }
  },
  data() {
    return {
      unblocked: true,
      textError: false,
      loading: false,
      comments: [],
      article: {},
      text: '',
      editState: false,
      userId: 0,
      editText: '',
      title: '',
      content: [],
      infomsg: '',
      currentComment: {
        id: 0,
        text: ''
      }
    };
  },
  mounted() {
    if (this.$session.exists()) {
      this.userId = this.$session.get('userId');
    }
  },
  updated() {
    //window.console.log(this.$refs.articleFrame);
    axios({
      method: 'post',
      url: 'http://localhost:3000/article/checkLink',
      data: {
        url: this.article.articleURL
      }
    })
      .then(res => {
        if (res.data) {
          if (res.data == 'Yes') {
            this.unblocked = false;
          } else {
            this.unblocked = true;
          }
        }
      })
      .catch(err => {
        this.infomsg = err;
      });
  },
  methods: {
    addComment() {
      if (this.$session.exists()) {
        let url =
          'http://localhost:3000/article/' + this.articleId + '/comments';
        axios({
          method: 'POST',
          url: url,
          data: {
            userId: this.userId,
            text: this.text
          }
        })
          .then(res => {
            this.text = '';
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
          'http://localhost:3000/comment/comments/' + this.currentComment.id;
        axios({
          method: 'PUT',
          url: url,
          data: {
            userId: this.userId,
            text: this.currentComment.text
          }
        })
          .then(res => {
            this.currentComment.text = '';
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
          'http://localhost:3000/comment/comments/' + this.currentComment.id;
        axios({
          method: 'DELETE',
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
      let url = 'http://localhost:3000/article/' + this.articleId + '/comments';
      axios({
        method: 'GET',
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
      //const nightmare = Nightmare();
      this.loading = true;
      let url = 'http://localhost:3000/article/articles/' + this.articleId;
      axios({
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        method: 'GET',
        url: url
      })
        .then(res => {
          var text;
          var checkTitle = '';
          var checkContent = '';
          this.article = res.data;
          this.getComments();
          (async () => {
            try {
              // await nightmare
              //   .useragent(
              //     'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
              //   )
              //   .goto(this.article.articleURL);

              // text = await nightmare
              //   .evaluate(() => {
              //     return document.body.innerHTML;
              //   })
              //   .end()
              //   .then(html => {
              //     return html;
              //   })
              //   .catch(error => {
              //     this.infomsg = error;
              //   });

              //console.log(text);

              const response = await fetch(this.article.articleURL);
              text = await response.text();

              checkTitle = text.match(/(<h1>).*(<\/h1>)/g)[0];
              checkContent = text.match(/(<p>).*(<\/p>)/g);

              if (checkTitle && checkContent) {
                this.textError = false;
                this.title = checkTitle;
                this.content = checkContent;
              }

              this.loading = false;
            } catch (err) {
              this.textError = true;
              this.loading = false;
            }
          })();
        })
        .catch(err => {
          this.infomsg = err;
          this.loading = false;
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
li {
  list-style: none;
  text-align: left;
}

.body {
  text-align: left;
}
</style>
