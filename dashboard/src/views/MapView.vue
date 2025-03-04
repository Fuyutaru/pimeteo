<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <HeaderApp @updateStationName="maj_station" />
        <InfoStation :stationName="stationName" :timestamp="timestamp" />
      </div>
    </div>

    <div class="row-10">
      <div class="box">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import HeaderApp from '@/components/HeaderApp.vue'
import InfoStation from '@/components/InfoStation.vue'

export default {
  components: {
    HeaderApp,
    InfoStation,
  },
  data() {
    return {
      stationsInfos: {
        'Pi 28': { name: 'Vanessa et Zijian', loc: null },
        'Pi 27': { name: 'Romain et Jiongru', loc: null },
        'Pi 29': { name: 'iamvdo et cedricici', loc: {lon: 2.5871930932709, lat: 48.84105713049722}},
        'Pi 30': { name: 'Loïs et Jean-Baptiste', loc: null },
        'Pi 31': { name: 'Vincent et Ibrahim', loc: null },
        'Pi 32': { name: 'Thomas et Antonin', loc: null },
      },
      stationName: 'Pi 28',
      timestamp: '',
      map: null,
      markers: [],
    }
  },
  async mounted() {
    await this.fetchAllStationData();
    this.initializeMap();
    this.get_date();
  },
  watch: {
    timestamp(newVal) {
      const minute = new Date(newVal).getMinutes()
      if (minute % 10 === 0) {
        console.log('time to fetch')
      }
    },
  },
  methods: {
    maj_station(newStationName) {
      this.stationName = newStationName
      const location = this.stationsInfos[this.stationName].loc
      this.map.flyTo({
        center: [location.lon, location.lat],
        zoom: 10,
        essential: true,
      })
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString()
      }, 1_000)
    },

    initializeMap() {
      this.map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=AJPmdudX9yJ2dZbT3iuM',
        center: [2, 48],
        zoom: 2,
        minZoom: 2,
      })

      console.log(this.stationsInfos);
      console.log("-------------------------")
      for (let val of Object.values(this.stationsInfos)) {
        let location = val.loc;
        if (location) {
          if (-180 <= location.lon && location.lon <= 180 && -90 <= location.lat  && location.lat <= 90) {
            this.addMarker(location.lon, location.lat);
          }
          
        }
      }



      // for (let [stationName, stationInfo] of Object.entries(this.stationsInfos)) {
      //   console.log("lon",stationInfo.loc.lon, stationInfo.loc.lat)
      //   if (stationInfo.loc) {
      //     this.addMarker(stationInfo.loc.lon, stationInfo.loc.lat);
      //   }
      // }
    },

    async fetchAllStationData() {
      const promises = Object.keys(this.stationsInfos).map((name) => this.fetchDataLive(name))
      await Promise.all(promises)
    },

    addMarker(lon, lat) {
      console.log(lon, lat)
      this.markers.push(new maplibregl.Marker().setLngLat([lon, lat]).addTo(this.map));
    
    },

    async fetchDataLive(station) {
      try {
        const response = await fetch(
          `http://piensg0${station.split(' ')[1]}.ensg.eu:3000/live/lat-lon`,
        )
        if (response.ok) {
          const jsonData = await response.json();
          this.stationsInfos[station].loc = { 'lon': jsonData.data.lon, 'lat': jsonData.data.lat }
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
}
</script>

<style scoped>
.box {
  background-color: #eee;
  padding: 40px;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
  height: 100vh;
}

#map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
