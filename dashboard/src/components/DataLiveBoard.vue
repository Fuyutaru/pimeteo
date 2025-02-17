<script>
  import MapBox from './MapBox.vue'
  import InfoStation from './InfoStation.vue'
  import SensorItem from './SensorItem.vue'

  export default {
    components: {
      MapBox,
      InfoStation,
      SensorItem,
    },
    props: {
      sensorList: {
        type: Array,
        required: true
      }
    },
  }
</script>

<template>
  <div class="box">

    <div class="sensorBox">
      <div v-for="sensor in sensorList" :key="sensor">
        <SensorItem>
        <template #title>{{ sensor.name }}</template>
        <template #val>{{ sensor.val }}</template>
        </SensorItem>
      </div>
    </div>

    <div class="infoBox">
      <InfoStation/>
    </div>

    <div class="mapBox">
      <MapBox />
    </div>


  </div>
    
</template>

<style scoped>
  .box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: #eee;
    padding: 30px;
    gap: 50px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .infoBox {
    grid-column: 1;
    grid-row: 2;
  }

  .mapBox {
    grid-column: 2;
    grid-row: 2;
  }

  .sensorBox {
    grid-row: 1;
    grid-column: 1 / span 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

</style>