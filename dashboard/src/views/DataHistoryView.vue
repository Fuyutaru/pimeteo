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
        <div v-if="sensorList.length !== 0">
          <MenuDate @updateTimeRange="maj_timeRange" />
        </div>
        <div v-else>
          <div class="alert alert-warning d-flex align-items-center mt-4" role="alert">
            Please select at least one sensor
          </div>
        </div>
      </div>
      <div class="col-10">
        <DataHistoryBoard :sensorData="sensorData" :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import InfoStation from '@/components/InfoStation.vue'
import MenuApp from '@/components/MenuApp.vue'
import MenuDate from '@/components/MenuDate.vue'
import DataHistoryBoard from '@/components/DataHistoryBoard.vue'
import { useSensorIcons } from '@/components/composables/iconSensor.js'
import { useSensorNames } from '@/components/composables/nameSensor'

export default {
  components: {
    HeaderApp,
    InfoStation,
    MenuApp,
    MenuDate,
    DataHistoryBoard,
  },
  data() {
    return {
      sensorList: [],
      sensorData: [],
      dataHistory: {},
      timestamp: '',
      timerange: { start: '', stop: '' },
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
    dataHistory() {
      // if (this.sensorList.includes('lat-lon')) {
      // this.location = { lon: this.dataHistory.data[0].lon, lat: this.dataHistory.data[1].lat }
      // console.log(this.dataHistory.data[0])
      // }
      const labels = Object.keys(this.dataHistory.data)
      const names = useSensorNames()

      this.sensorData = this.sensorList
        .filter((e) => e !== 'lat-lon')
        .map((sensor) => {
          return {
            name: names[sensor],
            dates: labels,
            unit: this.dataHistory.unit[sensor],
            // val: labels.map((label) => this.dataHistory.data[label][sensor]),
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
    },

    maj_timeRange(newTimerange) {
      this.timerange = newTimerange
      this.fetchDataLive()
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString()
      }, 1_000)
    },

    fetchDataLive() {
      fetch('./now.json')
        .then((response) => response.json())
        .then((json) => {
          this.dataHistory = json
        })
    },

    // async fetchDataLive() {
    //   try {
    //     const station = `http://piensg0${this.stationName.split(' ')[1]}.ensg.eu:3000/sample`;
    //     const time = `${this.timerange.start}/${this.timerange.stop}`;
    //     const sensor = this.sensorList.join('-');
    //     const route = `${station}/${time}/${sensor}`;

    //     const response = await fetch(route);
    //     if (response.ok) {
    //       console.log(route)
    //       this.dataHistory = await response.json();
    //     } else {
    //         throw new Error('Failed to fetch data');
    //     }
    //   } catch (error) {
    //       console.error('Error:', error);
    //     }
    // }
  },
}
</script>
