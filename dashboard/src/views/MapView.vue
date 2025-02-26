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
        <DataLiveBoard :sensorData="sensorData" :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    HeaderApp,
    InfoStation,
    DataLiveBoard,
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
    }
  },
  mounted() {
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
