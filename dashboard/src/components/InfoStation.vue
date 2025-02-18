<template>
    <div class="card">
        <div class="card-header"> Station {{ stationName }} </div>
        <div class="card-body">
        <h4 class="card-title ">{{ timestamp }}</h4>
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
}
</script>

<style scoped>

</style>