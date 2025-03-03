<template>
  <header
    class="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-bottom"
  >
    <img
      src="/pimeteo.png"
      class="ms-3"
      alt="Logo"
      width="40%"
      height="5%"
      title="Découvrez notre logo !"
    />

    <ul class="nav nav-pills me-5">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 28' }"
          @click="stationCliqued('Pi 28')"
          >Pi 28</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 27' }"
          @click="stationCliqued('Pi 27')"
          >Pi 27</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 29' }"
          @click="stationCliqued('Pi 29')"
          >Pi 29</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 30' }"
          @click="stationCliqued('Pi 30')"
          >Pi 30</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 31' }"
          @click="stationCliqued('Pi 31')"
          >Pi 31</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: stationName === 'Pi 32' }"
          @click="stationCliqued('Pi 32')"
          >Pi 32</a
        >
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      stationName: 'Pi 28',
    }
  },
  methods: {
    stationCliqued(newStationName) {
      this.stationName = newStationName
      this.$emit('updateStationName', this.stationName)
    },
  },
}
</script>
