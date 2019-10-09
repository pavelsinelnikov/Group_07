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
    var that = this;
    that.$gmapApiPromiseLazy().then(() => {
      that.geocoder = new this.google.maps.Geocoder();
      that.$refs.mapRef.$mapPromise.then(map => {
        that.$emit('country-selected', 'Canada');
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
