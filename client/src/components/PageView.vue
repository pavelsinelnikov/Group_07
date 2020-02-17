<template>
  <div>
    <div v-if="blocked" class="embed-responsive embed-responsive-4by3" ref="articleDiv">
      <iframe class="embed-responsive-item" :src="link" ref="articleFrame"></iframe>
    </div>
    <div v-if="!blocked" ref="linkDiv">
      <a :href="link">Article Link</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageView',
  props: ['providedLink'],
  data() {
    return {
      blocked: true
      //link: this.providedLink
    };
  },
  computed: {
    link() {
      return this.providedLink;
    }
  },
  updated(){
    window.console.log(this.$refs.articleFrame);
      axios({
        method: 'post',
        url: 'http://localhost:3000/article/checkLink',
        data: {
          url: this.providedLink
        }
      })
        .then(res => {
          if (res.data) {
            window.console.log(res);
            if (res.data == "Yes"){
              this.blocked = false;
            }
            else {
                this.blocked = true;
            }
          }
        })
        .catch(err => {
          window.console.log(err);
        });
  }
};
</script>

<style>
iframe {
  height: 70vh;
}
</style>
