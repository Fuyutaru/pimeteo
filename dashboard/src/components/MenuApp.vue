<script>
export default {
  data() {
    return {
      sensorName: ['temperature',
                   'rain', 
                   'humidity', 
                   'wind_speed_avg', 
                   'wind_heading',
                   'pressure', 
                   'luminosity',
                   'location',
                   'all'
                  ],
        sensorList: []
    }
  },
  methods: {
    helloSensor() {
      this.$emit('updateSensor', this.sensorList)
    },
  },
}
</script>

<template>
  <div class="container">
    <h2>Sensors</h2>

    <div class="mt-3">
      
      <div v-for="sensor in sensorName" :key="sensor">
        <div class="form-check">
          <input
            class = "form-check-input"
            type = "checkbox"
            :value = sensor
            v-model = "sensorList"
            @change = "helloSensor"
          />
          <label class="form-check-label"> {{ sensor === 'rain' ? 'precipitation' : sensor }} </label>
        </div>

      </div>
    </div>
  </div>

</template>
