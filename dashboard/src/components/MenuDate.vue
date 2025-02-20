<script>
export default {
  data() {
    return {
      sensorList: [],
      buttonTimerange: false,
      timeRangePicked: "",
      timeRange: {"start": "2025-20-02T10:30", "stop": "now"},
      stepDate: "",
    }
  },
  methods: {
    helloSensor() {
      this.$emit('update', this.sensorList)
    },
    helloStep() {
      console.log(this.stepDate);
    }
  },
  watch: {
    timeRangePicked(newVal) {
      console.log(this.timeRangePicked, new Date().toISOString());
    }
  }
}
</script>

<template>
  <div class="container mt-3">

    <h2>History</h2>

    <div class="d-flex flex-column my-3">

      <div class="form-check">
        <input class="form-check-input" type="radio" v-model="timeRangePicked" id="hour" value="hour">
        <label class="form-check-label" for="hour">
          Last Hour
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="radio" v-model="timeRangePicked" id="day" value="day">
        <label class="form-check-label" for="day">
          Last Day
        </label>
      </div>
  
      <div class="form-check">
        <input class="form-check-input" type="radio" v-model="timeRangePicked" id="week" value="week">
        <label class="form-check-label" for="week">
          Last week
        </label>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" v-model="timeRangePicked" name="exampleRadios" id="range" value="range">
        <label class="form-check-label" for="range">
          Choose time range
        </label>
      </div>
    </div>


    <div v-if=" timeRangePicked === 'range' ">


      <form  @submit.prevent="helloStep">
        <span class="badge text-bg-primary mb-2">Start Date</span>

        <div class="input-group mb-3">
            <input type="date" class="form-control" value="2025-20-02T10:30" v-model="timeRange.start">
        </div>

        <span class="badge text-bg-primary mb-2">Stop Date</span>

        <div class="input-group mb-3">
            <input type="date" class="form-control" value="2025-20-02T11:00" v-model="timeRange.stop">
        </div>

        <span class="badge text-bg-secondary mb-2">Choose an interval</span>
        <select class="form-select form-select-sm mb-3" aria-label="Default select example"  v-model="stepDate">
          <option selected disabled value="">Selection</option>
          <option value="hour">1 hour</option>
          <option value="day">1 day</option>
        </select>

        <button type="submit" class="btn btn-primary btn-sm">Submit</button>

      </form>


    </div>

  </div>
</template>
