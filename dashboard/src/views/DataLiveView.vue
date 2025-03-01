<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <HeaderApp @updateStationName="maj_station" />
        <InfoStation :stationName="stationName" :timestamp="timestamp" />
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <MenuApp @updateSensor="maj_sensor" />
      </div>
      <div class="col-10">
        <DataLiveBoard :sensorData="sensorData" :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import MenuApp from '@/components/MenuApp.vue'
import DataLiveBoard from '@/components/DataLiveBoard.vue'
import InfoStation from '@/components/InfoStation.vue'
import { useSensorIcons } from '@/components/composables/iconSensor'
import { useSensorNames } from '@/components/composables/nameSensor'

export default {
  components: {
    HeaderApp,
    InfoStation,
    MenuApp,
    DataLiveBoard,
  },
  data() {
    return {
      sensorList: [],
      sensorData: [],
      dataLive: {},
      timestamp: '',
      location: { lon: 0, lat: 0 },
      stationName: 'Pi 28',
    }
  },
  mounted() {
    this.get_date()
  },
  watch: {
    timestamp(newVal) {
      const minute = new Date(newVal).getMinutes()
      if (minute % 10 === 0) {
        console.log('time to fetch')
      }
    },
    dataLive() {
      if (this.sensorList.includes('lat-lon')) {
        this.location = { lon: this.dataLive.data.lon, lat: this.dataLive.data.lat }
      }
      const names = useSensorNames()
      this.sensorData = this.sensorList
        .filter((e) => e !== 'lat-lon')
        .map((sensor) => {
          return {
            name: names[sensor],
            val: `${this.dataLive.data[sensor]} ${this.dataLive.unit[sensor]}`,
            url: useSensorIcons(sensor),
          }
        })
    },
  },
  methods: {
    maj_sensor(sensorSelected) {
      if (sensorSelected.includes('all')) {
        this.sensorList = Object.keys(useSensorNames())
        this.sensorList.push('lat-lon')
      } else {
        this.sensorList = sensorSelected.filter((e) => e !== 'location' && e !== 'all')
        this.location = { lon: 0, lat: 0 }
      }
      if (sensorSelected.includes('location')) {
        this.sensorList.push('lat-lon')
      }
      this.fetchDataLive()
    },

    maj_station(newStationName) {
      this.stationName = newStationName
      this.fetchDataLive()
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString()
      }, 1_000)
    },

    async fetchDataLive() {
      try {
        const response = await fetch(
          // `http://piensg0${this.stationName.split(' ')[1]}.ensg.eu:3000/live/${this.sensorList.join('-')}`,
          './live2.json',
        )
        if (response.ok) {
          this.dataLive = await response.json()
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
