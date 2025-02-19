<template>
  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a
      href="https://web.iamvdo.me/js/exercices/projet-station-meteo/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
    >
      <span class="fs-2">Projet Pimeteo</span>
    </a>

    <ul class="nav nav-pills me-5">
      <li class="nav-item">
          <a href="#" class="nav-link" :class="{ active: stationName === 'Pi 28' }" @click="stationCliqued('Pi 28')">Pi 28</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" :class="{ active: stationName === 'Pi 27' }" @click="stationCliqued('Pi 27')">Pi 27</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" :class="{ active: stationName === 'Pi 30' }" @click="stationCliqued('Pi 30')">Pi 30</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" :class="{ active: stationName === 'Pi 31' }" @click="stationCliqued('Pi 31')">Pi 31</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" :class="{ active: stationName === 'Pi 32' }" @click="stationCliqued('Pi 32')">Pi 32</a>
        </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      stationName: "Pi 28",
    }
  },
  methods: {
    stationCliqued(newStationName) {
      this.stationName = newStationName;
      console.log(this.stationName);
    }
  }


}

</script>

<style scoped></style>
