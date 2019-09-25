<template>
  <div>
    <h1>NEWS MAP</h1>
    <nav>
      <router-link class="spacing" v-for="routes in links" 
       v-bind:key="routes.id"
       :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
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
 .spacing {
   margin-right: 10px;
 }
 </style>


