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
        <MenuDate @updateTimeRange="maj_timeRange" />
        <div class="d-flex justify-content-center my-2">
          <button type="button" class="btn btn-success" @click="validate">See Results</button>
        </div>
      </div>
      <div class="col-10">
        <div v-if="loading" class="m-4 d-flex justify-content-center align-items-center">
          <LoaderBoussole />
          <h2 class="ms-5">Veuillez patienter...</h2>
        </div>
        <ErrorStation v-if="error" />
        <DataHistoryBoard v-else :sensorData="sensorData" :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import InfoStation from '@/components/InfoStation.vue'
import MenuApp from '@/components/MenuApp.vue'
import MenuDate from '@/components/MenuDate.vue'
import LoaderBoussole from '@/components/LoaderBoussole.vue'
import ErrorStation from '@/components/ErrorStation.vue'
import DataHistoryBoard from '@/components/DataHistoryBoard.vue'
import { useSensorIcons } from '@/components/composables/iconSensor.js'
import { useSensorNames } from '@/components/composables/nameSensor'
import { useAggregate } from '@/components/composables/aggregateData'

export default {
  components: {
    HeaderApp,
    InfoStation,
    MenuApp,
    MenuDate,
    DataHistoryBoard,
    ErrorStation,
    LoaderBoussole,
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
      loading: false,
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
      const labels = Object.keys(this.dataHistory.data)
      const names = useSensorNames()

      this.sensorData = this.sensorList
        .filter((e) => e !== 'lat-lon')
        .map((sensor) => {
          let values = labels.map((date) => this.dataHistory.data[date][sensor])
          let agreg = useAggregate(this.timerange.start, this.timerange.stop, labels, values)

          return {
            name: names[sensor],
            dates: agreg.map((e) => e.date),
            unit: this.dataHistory.unit[sensor],
            val: agreg.map((e) => e.value),
            url: useSensorIcons(sensor),
          }
        })

      if (this.sensorList.includes('lat-lon')) {
        this.location = {
          lon: this.dataHistory.data[labels[0]].lon,
          lat: this.dataHistory.data[labels[0]].lat,
        }
      }
    },
  },
  methods: {
    maj_sensor(sensorSelected) {
      if (sensorSelected.includes('all')) {
        this.sensorList = Object.keys(useSensorNames())
        this.sensorList.push('lat-lon')
      } else {
        this.sensorList = sensorSelected.filter((e) => e !== 'location' && e !== 'all')
      }
      if (sensorSelected.includes('location')) {
        this.sensorList.push('lat-lon')
      }
    },

    maj_station(newStationName) {
      this.stationName = newStationName
    },

    maj_timeRange(newTimerange) {
      if (this.sensorList.length === 0) {
        alert('Choose at least one sensor please')
      } else {
        this.timerange = newTimerange
      }
    },
    validate() {
      if (
        (this.timerange.start !== '' && this.timerange.stop != '') ||
        this.sensorList.length !== 0
      ) {
        console.log(this.timerange)

        this.fetchDataLive()
      } else {
        alert('Choose sensor(s) and a timerange please')
      }
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString()
      }, 1_000)
    },

    diff2date(startDate, endDate) {
      const seconds = Math.floor((endDate - startDate) / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      return { days, hours }
    },

    async fetchDataLive() {
      this.loading = true
      try {
        const station = `http://piensg0${this.stationName.split(' ')[1]}.ensg.eu:3000/sample`
        const time = `${this.timerange.start}/${this.timerange.stop}`
        const sensor = this.sensorList.join('-')
        const route = `${station}/${time}/${sensor}`

        const response = await fetch(route)
        if (response.ok) {
          console.log(route)
          this.dataHistory = await response.json()
          this.loading = false
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
