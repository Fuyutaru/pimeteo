<template>
    <div class="card">
        <div class="card-header"> 
          <button type="button" class="btn btn-outline-danger btn-sm me-2" data-bs-toggle="button">
            Data Live
          </button>
          Station {{ stationName }} | {{ infos[stationName] }}
        </div>
        <div class="card-body">
        <h5>{{ readableTimestamp() }}</h5>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    stationName: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      infos: {
        "Pi 28": "Vanessa et Zijian",
        "Pi 27": "Romain et Jiongru",
        "Pi 30": "Loïs et Jean-Baptiste",
        "Pi 31": "Vincent et Ibrahim",
        "Pi 32": "Thomas et Antonin"
      }
    }
  },
  methods: {
    readableTimestamp() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'};
      let time = new Date(this.timestamp).toLocaleDateString("fr-FR", options)
                    .replace(/./, c => c.toUpperCase())
                    .replace(/,? /, ", ");
      return time;
    }
  }
}
</script>

