<script>
export default {
  data() {
    return {
      sensorName: {
        rain: 'Precipitation',
        temperature: 'Temperature',
        humidity: 'Humidity',
        pressure: 'Pressure',
        wind_speed_avg: 'Wind Speed',
        wind_heading: 'Wind Heading',
        luminosity: 'Luminosity',
        location: 'Location',
        all: 'All Sensors',
      },
      sensorList: [],
    }
  },
  methods: {
    helloSensor() {
      this.$emit('updateSensor', this.sensorList)
    },

    handleSensorChange(sensor) {
      if (sensor === 'all') {
        this.sensorList = ['all']
      } else {
        this.sensorList = this.sensorList.filter((item) => item !== 'all')
      }
      this.helloSensor()
    },
  },
}
</script>

<template>
  <div class="container">
    <h2>Sensors</h2>

    <div class="mt-3">
      <div v-for="(name, val) in sensorName" :key="sensor">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :value="val"
            v-model="sensorList"
            @change="handleSensorChange(val)"
          />
          <label class="form-check-label">
            {{ name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
