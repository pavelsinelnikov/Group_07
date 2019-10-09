<template>
  <div>
    <div class="embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" :src="link"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageView',
  props: ['providedLink'],
  data() {
    return {
      //link: this.providedLink
    };
  },
  computed: {
    link() {
      return this.providedLink;
    }
  }
};
</script>

<style></style>
