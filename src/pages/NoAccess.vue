<template>
  <div>
    <p>You have to be logged in to see this page!</p>
  </div>
</template>

<script>
export default {
  name: 'NoAccess',
  data() {},
  beforeCreate() {
    if (this.$session.exists()) {
      this.$router.push('/verification');
      this.$router.go();
    }
  }
};
</script>
