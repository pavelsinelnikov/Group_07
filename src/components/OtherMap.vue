<template>
  <div ref="mapDiv"></div>
</template>

<script>
//import WorldMap from './../assets/worldIndiaHigh.svg';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldIndiaUltra';

export default {
  data() {
    return {
      marker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      svg: null
    };
  },
  mounted() {
    // Create map instance
    let map = am4core.create(this.$refs.mapDiv, am4maps.MapChart);

    // Set map definition
    map.geodata = am4geodata_worldLow;

    // Set projection
    map.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ['AQ'];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = am4core.color('#74B266');

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#367B25');
  },
  components: {
    //WorldMap
  }
};
</script>

<style>
div {
  margin: 0 auto;
  width: 100%;
  height: 900px;
}
</style>
