import Vue from 'vue';
import App from './App';
import * as VueGoogleMaps from 'vue2-google-maps';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';

//Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
//Vue.http.headers.common['Access-Control-Request-Method'] = '*';
//import axios from 'axios';

// const http = axios.create({
//   baseURL: process.env.BACKEND_URL
//     ? process.env.BACKEND_URL
//     : 'http://localhost/login'
// });

// Vue.prototype.$http = http;

import VueSession from 'vue-session';

var options = {
  persist: true
};

Vue.use(VueSession, options);

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
  el: '#app',
  router,
  components: { App },
  render: function(createElement) {
    return createElement(App);
  }
});
