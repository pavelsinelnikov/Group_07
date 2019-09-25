<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-container>
            <b-navbar-brand href="/">NEWS MAP</b-navbar-brand>
            <b-navbar-brand href="#/contact">Contact</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <!-- SEARCH BAR IS NOT YET WORKING -->
              <b-navbar-nav class="ml-auto">
                <b-nav-form>
                  <b-form-input 
                    size="sm" 
                    class="mr-sm-2" 
                    placeholder="WORK IN PROG"
                    v-model="country"
                    ></b-form-input>
                  <b-button 
                    size="sm" 
                    class="my-2 my-sm-0" 
                    type="submit" 
                    @click="fetchDataFromNewsAPI()"
                    >Search</b-button>
                </b-nav-form>
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content"><em>User</em></template>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
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
           page:'/'
         },
         {
           id: 1,
           text: 'Contact',
           page:'/contact'
         }
       ]
     }
   }
 }
 </script>
 <style>

 </style>


