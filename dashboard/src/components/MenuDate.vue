<script>
export default {
  data() {
    return {
      sensorList: [],
      buttonTimerange: false,
      time: "",
    }
  },
  methods: {
    helloSensor() {
      this.$emit('update', this.sensorList)
    },
    toggleTimerange() {
      this.buttonTimerange = !this.buttonTimerange;
    }
  },
}
</script>

<template>
  <div class="container mt-3">

    <h2>History</h2>

    <div class="d-flex flex-column my-3">

      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="hour" value="hour">
        <label class="form-check-label" for="hour">
          Last Hour
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="day" value="day">
        <label class="form-check-label" for="day">
          Last Day
        </label>
      </div>
  
      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="exampleRadios" id="week" value="week">
        <label class="form-check-label" for="week">
          Last week
        </label>
      </div>

      <button type="button" class="btn btn-primary btn-sm" @click="toggleTimerange" :disabled="time.length !== 0">Choose time range</button>


    </div>



    <div v-if="buttonTimerange">
      <span class="badge text-bg-primary mb-2">Start Date</span>

      <div class="input-group mb-3">
          <input type="date" class="form-control" value="2017-06-01T08:30">
      </div>

      <span class="badge text-bg-primary mb-2">Stop Date</span>

      <div class="input-group mb-3">
          <input type="date" class="form-control" value="2017-06-01T08:30">
      </div>

      <button type="button" class="btn btn-primary btn-sm">Submit</button>


    </div>

  </div>
</template>
