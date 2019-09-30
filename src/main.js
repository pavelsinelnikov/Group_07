import Vue from 'vue';
//import Home from './App.vue';
import NotFound from './pages/NotFound.vue';
import Contact from './pages/Contact.vue';
import About from './pages/About.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from './router';
const routes = {
  '/contact': Contact,
  '/': About
};

Vue.use(BootstrapVue);

Vue.use(VueGoogleMaps, {
  load: {
    // API Key will be given in a separate file not included in git
    // I would suggest making your own one for now
    key: `${process.env.VUE_APP_GOOGLE_API}`,
    libraries: 'places'
  },

  installComponents: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
}).$mount('#app');
