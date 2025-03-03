<template>
  <div class="card">
    <div class="card-header">
      <button
        v-if="$route.name === 'home'"
        type="button"
        class="btn btn-outline-danger btn-sm me-2"
        data-bs-toggle="button"
      >
        Data Live
      </button>
      <button
        v-if="$route.name === 'history'"
        type="button"
        class="btn btn-outline-success btn-sm me-2"
        data-bs-toggle="button"
      >
        Data History
      </button>
      Station {{ stationName }} | {{ infos[stationName] }}
    </div>
    <div class="card-body d-flex flex-row justify-content-between">
      <h5>{{ readableTimestamp() }}</h5>
      <div>
        <router-link
          v-if="$route.name === 'history' || $route.name === 'map'"
          to="/"
          class="btn btn-outline-danger btn-sm me-2"
          data-bs-toggle="button"
          >Go Data Live</router-link
        >
        <router-link
          v-if="$route.name === 'home' || $route.name === 'map'"
          to="/history"
          class="btn btn-outline-success btn-sm me-2"
          data-bs-toggle="button"
          >Go Data History</router-link
        >
        <router-link
          v-if="$route.name !== 'map'"
          to="/map"
          class="btn btn-outline-primary btn-sm me-2"
          data-bs-toggle="button"
          >Go Map stations</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stationName: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      infos: {
        'Pi 28': 'Vanessa et Zijian',
        'Pi 27': 'Romain et Jiongru',
        'Pi 29': 'iamvdo et cedricici',
        'Pi 30': 'Loïs et Jean-Baptiste',
        'Pi 31': 'Vincent et Ibrahim',
        'Pi 32': 'Thomas et Antonin',
      },
    }
  },
  methods: {
    readableTimestamp() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }
      let time = new Date(this.timestamp)
        .toLocaleDateString('fr-FR', options)
        .replace(/./, (c) => c.toUpperCase())
        .replace(/,? /, ', ')
      return time
    },
  },
}
</script>
