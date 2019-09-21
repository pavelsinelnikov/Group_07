<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="{ lat: 10, lng: 10 }"
      :zoom="2"
      map-type-id="terrain"
      style="width: 1000px; height: 500px"
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

export default {
  data() {
    return {
      map: null,
      marker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      geocoder: null
    };
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    this.geocoder = new this.google.maps.Geocoder();
    var that = this;
    this.$refs.mapRef.$mapPromise.then(map => {
      map.addListener('click', function(e) {
        that.marker.position = e.latLng;
        map.panTo(e.latLng);
        that.geocoder.geocode({ latLng: e.latLng }, function(results, status) {
          console.log(results[results.length - 1].formatted_address);
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
