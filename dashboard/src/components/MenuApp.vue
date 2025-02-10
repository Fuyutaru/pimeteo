<script>
export default {
  data() {
    return {
      sensorList: [],
    }
  },
  methods: {
    helloSensor() {
      this.$emit('update', this.sensorList)
    },
  },
}
</script>

<template>
  <div class="container">
    <h2>Sensors</h2>

    <div class="sensor mt-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="temp"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="temp"> Temperature </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="rain"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="rain"> Precipitation </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="hum"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="hum"> Humidity </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="wind-speed"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="wind-speed"> Wind Speed </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="wind-dir"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="wind-dir"> Wind Direction </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="pressure"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="pressure"> Pressure </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="lum"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="lum"> Luminosity </label>
      </div>
    </div>

    <button type="button" class="btn btn-outline-danger mt-4 mx-3" data-bs-toggle="button">
      Data Live
    </button>
    <button type="button" class="btn btn-outline-success mt-3 mx-3">Data History</button>
  </div>
</template>
