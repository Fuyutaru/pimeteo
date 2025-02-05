
<template>
  <div id="map"></div>
</template>

<script>
export default {
    mounted(){
        var map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        center: [2, 48], // starting position [lng, lat]
        zoom: 2 // starting zoom
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