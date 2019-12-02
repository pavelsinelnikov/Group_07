<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand id="logo" href="#"
        ><img src="../assets/logo.png"
      /></b-navbar-brand>
      <b-navbar-brand href="/">NEWS MAP</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/contact">Contact</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em> {{ user }} </em>
            </template>
            <b-dropdown-item v-if="user == 'log in'" href="/login"
              >Login/Signup</b-dropdown-item
            >
            <div v-else>
              <b-dropdown-item href="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'Contact',
          page: '/contact'
        }
      ],
      user: this.user
    };
  },
  beforeCreate: function() {
    if (this.$session.exists()) {
      this.user = this.$session.get('email');
    } else {
      this.user = 'log in';
    }
  },
  methods: {
    logout: function() {
      this.$session.destroy();
      this.$router.push('/');
      this.$router.go();
    }
  }
};
</script>
<style>
#logo > img {
  height: 70px;
  width: auto;
}
</style>
