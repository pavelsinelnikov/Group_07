<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="{ lat: 10, lng: 10 }"
      :zoom="2"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        ref="mapMarker"
        :position="marker.position"
        :clickable="true"
      ></GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
//import axios from 'axios';

export default {
  data() {
    return {
      map: null,
      country: '',
      marker: {
        position: {
          lat: 56.1303673,
          lng: -106.3467712
        }
      },
      geocoder: null
    };
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    //   axios({
    //   method: 'get',
    //   url: 'http://localhost:3000/user/profile',
    //   params: {
    //     email: this.$session.get('email')
    //   },
    //   responseType: 'json'
    // })
    //   .then(res => {
    //     if (res.data) {
    //       this.country = res.data.oneUser.country;
    //     }
    //   })
    //   .catch
    //   //this.localmsg = err;
    //   ();

    var that = this;
    that.$gmapApiPromiseLazy().then(() => {
      that.geocoder = new this.google.maps.Geocoder();
      that.$refs.mapRef.$mapPromise.then(map => {
        that.$emit('country-selected', this.country);
        map.addListener('click', function(e) {
          that.marker.position = e.latLng;
          map.panTo(e.latLng);
          that.geocoder.geocode({ latLng: e.latLng }, function(results) {
            that.$emit('url-emitted', '');
            that.$emit(
              'country-selected',
              results[results.length - 1].formatted_address
            );
          });
        });
      });
    });
  },
  methods: {}
};
</script>

<style>
div {
  margin: 0 auto;
}
</style>
