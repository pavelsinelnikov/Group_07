import Vue from 'vue';
import App from './App.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

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
  render: h => h(App)
}).$mount('#app');
