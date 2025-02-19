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
  <div class="container mt-3">

    <h2>History</h2>

    <div class="d-flex flex-column my-3">
      <div class="d-flex flex-row justify-content-between mb-2">
          <button type="button" class="btn btn-outline-info btn-sm">Last Hour</button>
          <button type="button" class="btn btn-outline-info btn-sm">Last Day</button>
      </div>
      <button type="button" class="btn btn-outline-info btn-sm mb-3">Last Week</button>
      <button type="button" class="btn btn-outline-primary btn-sm">Choose time range</button>
    </div>



    <span class="badge text-bg-primary mb-2">Start Date</span>

    <div class="input-group mb-3">
        <input type="date" class="form-control" value="2017-06-01T08:30">
    </div>

    <span class="badge text-bg-primary mb-2">Stop Date</span>

    <div class="input-group mb-3">
        <input type="date" class="form-control" value="2017-06-01T08:30">
    </div>

  </div>
</template>
