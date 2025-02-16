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

    data() {
      return {
          dataLive: {},
      }
    },
    mounted(){
      fetch("./live.json")
          .then(response => response.json())
          .then(json => this.dataLive=json);
    },
    
    methods: {
      hello(){
          console.log(this.dataLive.data.date);
      },
      read(){

      }
    }
  }
</script>

<template>
  <div class="box">

    <div class="dataBox">
      <InfoStation/>
    </div>

    <div class="mapBox">
      <MapBox />
    </div>

    <div class="sensorBox">
      <SensorItem />

      <div v-for="sensor in sensorList" :key="sensor">
        {{ sensor }}
      </div>

    </div>

  </div>
    
</template>

<style scoped>
  .box {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: #eee;
    padding: 30px;
    gap: 50px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .dataBox {
    grid-column: 1;
    grid-row: 1;
  }

  .mapBox {
    grid-column: 2;
    grid-row: 1;
  }

  .sensorBox {
    grid-row: 2;
    grid-column: 1 / span 2;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

</style>