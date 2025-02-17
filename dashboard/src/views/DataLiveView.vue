<script>
import HeaderApp from '@/components/HeaderApp.vue'
import MenuApp from '@/components/MenuApp.vue'
import DataLiveBoard from '@/components/DataLiveBoard.vue'

export default {
  components: {
    HeaderApp,
    MenuApp,
    DataLiveBoard,
  },
  data() {
    return {
      sensorList: [],
      dataLive: {},
      sensorName: {"rain": "Precipitation", 
                   "temperature": "Temperature", 
                   "humidity": "Humidity",
                   "pressure": "Pressure",
                   "wind_speed_avg": "Wind Speed",
                   "wind_heading": "Wind Direction",
                   "luminosity": "Luminosity"
                  },
    }
  },

  mounted(){
      fetch("./live.json")
          .then(response => response.json())
          .then(json => this.dataLive=json);
  },

  methods: {
    maj_sensor(sensorSelected) {
      this.sensorList = sensorSelected.map(sensor => {
        return {
          name: this.sensorName[sensor],
          val: `${this.dataLive.data[sensor]} ${this.dataLive.unit[sensor]}`
        }
      });
    },
  },
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <HeaderApp />
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <MenuApp @update="maj_sensor" />
            </div>
            <div class="col-10">
              <DataLiveBoard :sensorList="sensorList" />
            </div>
        </div>
    </div>
</template>
