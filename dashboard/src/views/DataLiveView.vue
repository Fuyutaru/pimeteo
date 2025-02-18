<template>
  <div class="container">
      <div class="row mb-4">
          <div class="col">
              <HeaderApp />
              <InfoStation :stationName="stationName" :timestamp="timestamp"/>
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


<script>
import HeaderApp from '@/components/HeaderApp.vue'
import MenuApp from '@/components/MenuApp.vue'
import DataLiveBoard from '@/components/DataLiveBoard.vue'
import TemperatureIcon from '@/assets/temperature.png'
import InfoStation from '@/components/InfoStation.vue'
import LumIcon from '@/assets/luminosity.png'
import HumIcon from '@/assets/humidity.png'
import PrecipIcon from '@/assets/precipitation.png'
import HeadIcon from '@/assets/wind_head.png'
import SpeedIcon from '@/assets/wind_speed.png'
import PressIcon from '@/assets/pressure.png'

export default {
  components: {
    HeaderApp,
    InfoStation,
    MenuApp,
    DataLiveBoard,
  },
  data() {
    return {
      sensorList: [],
      dataLive: {},
      timestamp: "",
      stationName: "Pi 28",
      sensorName: {"rain": "Precipitation", 
                   "temperature": "Temperature", 
                   "humidity": "Humidity",
                   "pressure": "Pressure",
                   "wind_speed_avg": "Wind Speed",
                   "wind_heading": "Wind Heading",
                   "luminosity": "Luminosity"
                  },
      sensorIcon: {"rain": PrecipIcon, 
                   "temperature": TemperatureIcon, 
                   "humidity": HumIcon,
                   "pressure": PressIcon,
                   "wind_speed_avg": SpeedIcon,
                   "wind_heading": HeadIcon,
                   "luminosity": LumIcon
                  },
    }
  },
  mounted(){
    fetch("./live.json")
      .then(response => response.json())
      .then(json => this.dataLive=json);

    this.get_date();
  },
  watch: {
    timestamp(newVal) {
      const minute = new Date(newVal).getMinutes();
      if (minute % 10 === 0){
        console.log(minute);
      }

    }
  },
  methods: {
    maj_sensor(sensorSelected) {
      this.sensorList = sensorSelected.map(sensor => {
        return {
          name: this.sensorName[sensor],
          val: `${this.dataLive.data[sensor]} ${this.dataLive.unit[sensor]}`,
          url: this.sensorIcon[sensor],
        }
      });
    },
    get_date() {
      const timer = setInterval(() => {
        const today = new Date();
        this.timestamp = today.toUTCString();
      }, 1_000);
    }
  },
}

</script>

