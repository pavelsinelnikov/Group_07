<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="danger">
    <b-navbar-brand id="logo" href="#"><img src="../assets/logo.png"></b-navbar-brand>
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
            <em>User</em>
          </template>
          <b-dropdown-item href="/login">Login</b-dropdown-item>
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
      ]
    };
  }
};
</script>
<style>

#logo>img {
  height: 70px;
  width: auto;
}
  </style>
