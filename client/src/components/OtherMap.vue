<template>
  <div id="mapDiv" ref="mapDiv"></div>
</template>

<script>
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

export default {
  data() {
    return {
      marker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      svg: null,
      countries: []
    };
  },
  mounted() {
    var that = this;
    // Create map instance

    let map = am4core.create(this.$refs.mapDiv, am4maps.MapChart);

    // Set map definition
    map.geodata = am4geodata_worldLow;

    // Set projection
    map.projection = new am4maps.projections.Miller();

    // The rest of the world.
    var notFound = map.series.push(new am4maps.MapPolygonSeries());
    var notFoundName = "world";
    notFound.name = notFoundName;
    notFound.useGeodata = true;
    notFound.fillOpacity = 0.8;
    notFound.mapPolygons.template.nonScalingStroke = true;
    
    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    
    //Exclude countries
    polygonSeries.exclude= ["CF", "AQ", "CD"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    //Disable all panning
     map.seriesContainer.draggable = false;
     map.seriesContainer.resizable = false;

     //Disable all zooming
     map.maxZoomLevel = 1;
     
    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");

    //Set user country
    axios({
      method: "get",
      url: "http://localhost:3000/user/profile",
      params: {
        userId: this.$session.get("userId")
      },
      responseType: "json"
    })
      .then(res => {
        if (res.data.oneUser) {
          that.$emit("country-selected", {
            code: res.data.oneUser.country,
            name: res.data.oneUser.country
          });
          //console.log(res.data.oneUser.country)
        }
      })
      .catch
      //this.localmsg = err;
      ();

    // Create active state
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = am4core.color("#d9534f");

    polygonTemplate.events.on("hit", function(ev) {
      ev.target.isActive = !ev.target.isActive;

      // get object info
      //that.$emit('url-emitted', '');
      that.$emit("country-selected", {
        code: ev.target.dataItem.dataContext.id,
        name: ev.target.dataItem.dataContext.name
      });
      //console.log(ev.target.dataItem.dataContext.name);
    });

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");
  },
  components: {
    //WorldMap
  }
};
</script>

<style>
#mapDiv {
  margin: 0 auto;
  width: 100%;
  height: 70vh;
}
</style>
