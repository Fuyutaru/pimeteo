<template>
    <div class="card">
        <div class="card-header"> Station {{ stationName }} </div>
        <div class="card-body">
        <h4 class="card-title ">{{ readableTimestamp() }}</h4>
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

