<template>
  <div>
    <p>You can see this page, Hooray!</p>
  </div>
</template>

<script>
export default {
  name: 'Verification',
  data() {},
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/noaccess');
      this.$router.go();
    }
  }
};
</script>
