<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MapView from './views/MapView.vue'
</script>

<template>
  <RouterView />
  <router-link to="/map" class="btn btn-outline-danger btn-lg m-4" data-bs-toggle="button">Go MAP</router-link>
</template>

<style scoped></style>
