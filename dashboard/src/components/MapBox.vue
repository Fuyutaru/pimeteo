<template>
  <div id="map"></div>
  <p class="m-2 d-flex justify-content-center">
    Station Location :
    <span class="badge text-bg-primary ms-3">lon : 2</span>
    <span class="badge text-bg-primary ms-1">lat : 48</span>
  </p>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      this.map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        center: [2, 48],
        zoom: 4,
        minZoom: 2,
      })
    },
    hello() {
      console.log('hello')
    },
    read() {},
  },
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 90%;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
