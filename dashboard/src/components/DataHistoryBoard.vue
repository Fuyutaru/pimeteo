<script>
import ChartItem from './ChartItem.vue'
import MapBox from './MapBox.vue'

export default {
  components: {
    MapBox,
    ChartItem,
  },
  props: {
    sensorData: {
      type: Array,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="box">
    <div class="sensorBox">
      <div v-for="sensor in sensorData" :key="sensor">
        <ChartItem :sensorData="sensor">
          <template #icon> <img alt="icon" class="icon-square" :src="sensor.url" /> </template>
          <template #title>{{ sensor.name }}</template>
        </ChartItem>
      </div>
    </div>

    <div class="mapBox">
      <MapBox :location="location" />
    </div>
  </div>
</template>

<style scoped>
.box {
  display: grid;
  grid-template-rows: 1fr 400px;
  height: 100%;
  background-color: #eee;
  padding: 30px;
  gap: 50px;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.mapBox {
  grid-row: 2;
}

.sensorBox {
  grid-row: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 30px;
}

.icon-square {
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background-color: rgb(219 234 254);
}
</style>
