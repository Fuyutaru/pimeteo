<script>
  import MapBox from  './MapBox.vue'
  import DataHistory from './DataHistory.vue'
  import IconTooling from './icons/IconTooling.vue'
    
  export default {
    components: {
      MapBox,
      DataHistory,
      IconTooling
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
      <div class="card">
        <div class="card-header"> Data Live </div>
        <div class="card-body">
          <h2 class="card-title ">Date</h2>


          <ul class="list-group m-2">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Temperature
              <span class="badge text-bg-primary rounded-pill">14 C°</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Precipitation
              <span class="badge text-bg-primary rounded-pill">0 mm</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Humidity
              <span class="badge text-bg-primary rounded-pill">94 %</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Wind Speed
              <span class="badge text-bg-primary rounded-pill">1.54 m/s</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Wind Direction
              <span class="badge text-bg-primary rounded-pill">20 deg</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Pressure
              <span class="badge text-bg-primary rounded-pill">1017 hPa</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Luminosity
              <span class="badge text-bg-primary rounded-pill">10 Lux</span>
            </li>
          </ul>


        </div>
      </div>
    </div>

    <div class="mapBox">
      <MapBox />
    </div>

    <div class="sensorBox">

      <div class="SensorItem">
        <div class="col d-flex align-items-start border-bottom border-dark-subtle mb-4">
          <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg"/>
          </div>
          <div>
            <h3 class="fs-3 text-body-emphasis">Wind Speed</h3>
          </div>
        </div>
        <div>
          <p class="text-center">10 km/h</p>
        </div>

      </div>
      <div class="SensorItem">
        <p>Salmon</p>
      </div>
      <div class="SensorItem">
        <p>Salmon</p>
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

  .SensorItem {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    background-color: rgb(219 234 254);

    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .icon-square {
    width: 3rem;
    height: 3rem;
    border-radius: .75rem;
  }



</style>