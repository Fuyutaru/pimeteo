
<template>
  <div id="map"></div>
</template>

<script>
export default {
    mounted(){
        var map = new maplibregl.Map({
        container: 'map',
        style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
        });
    }
}


</script>


<style scoped>
#map {
  height: 100vh;
  width: 100vh;
}
</style>