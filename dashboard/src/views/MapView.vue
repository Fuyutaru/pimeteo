<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <HeaderApp @updateStationName="maj_station" />
        <InfoStation :stationName="stationName" :timestamp="timestamp" />
      </div>
    </div>
    
    <div class="row">
      <div class="row-10">
        <div class="box">
          <div id="map"></div>
        </div>
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
        'Pi 28': { name: 'Vanessa et Zijian', loc: '' },
        'Pi 27': { name: 'Romain et Jiongru', loc: '' },
        'Pi 30': { name: 'Loïs et Jean-Baptiste', loc: '' },
        'Pi 31': { name: 'Vincent et Ibrahim', loc: '' },
        'Pi 32': { name: 'Thomas et Antonin', loc: '' },
      },
      stationName: 'Pi 28',
      timestamp:"",
      map: null,
    }
  },
  mounted() {
    this.initializeMap();
    for (const key of Object.keys(this.stationsInfos)) {
    }
    this.get_date()
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
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString()
      }, 1_000)
    },

    initializeMap() {
      this.map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets-v2/style.json?key=AJPmdudX9yJ2dZbT3iuM',
        center: [2, 48],
        zoom: 4,
        minZoom: 2,
      });

    },

    async fetchDataLive(station) {
      try {
        const response = await fetch(`http://piensg0${station}.ensg.eu:3000/live/lat-lon`)
        if (response.ok) {
          const data = await response.json()
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
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
}

#map {
  width: 100px;
  height: 100px;
}
</style>