<template>
  <div id="map"></div>
  <p class="m-2 d-flex justify-content-center">
    Station Location :
    <span class="badge text-bg-primary ms-3">lon : {{ location.lon }}</span>
    <span class="badge text-bg-primary ms-1">lat : {{ location.lat }}</span>
  </p>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      marker: null,
    }
  },
  mounted() {
    this.initializeMap()
  },
  watch: {
    location() {
      if (this.location.lon + this.location.lat === 0) {
        this.initializeMap()
        this.marker = null
      } else {
        if (!this.marker) {
          this.marker = new maplibregl.Marker()
            .setLngLat([this.location.lon, this.location.lat])
            .addTo(this.map)

          this.map.flyTo({
            center: [this.location.lon, this.location.lat],
            zoom: 10,
            essential: true,
          })
        }
      }
    },
  },
  methods: {
    initializeMap() {
      this.map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=AJPmdudX9yJ2dZbT3iuM',
        center: [2, 48],
        zoom: 4,
        minZoom: 2,
      })
    },
  },
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 95%;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
