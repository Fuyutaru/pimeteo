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

    <div class="mt-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="temperature"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="temperature"> Temperature </label>
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
          value="humidity"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="humidity"> Humidity </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="wind_speed_avg"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="wind_speed_avg"> Wind Speed </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="wind_heading"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="wind_heading"> Wind Direction </label>
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
          value="luminosity"
          v-model="sensorList"
          @change="helloSensor"
        />
        <label class="form-check-label" for="luminosity"> Luminosity </label>
      </div>
    </div>

    <button type="button" class="btn btn-outline-danger mt-4 mx-3" data-bs-toggle="button">
      Data Live
    </button>
    <button type="button" class="btn btn-outline-success mt-3 mx-3">Data History</button>
  </div>
</template>
