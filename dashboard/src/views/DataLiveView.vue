<template>
  <div class="container">
      <div class="row mb-4">
          <div class="col">
              <HeaderApp @updateStationName="maj_station" />
              <InfoStation :stationName="stationName" :timestamp="timestamp"/>
          </div>
      </div>
      <div class="row">
          <div class="col-2">
              <MenuApp @update="maj_sensor" />
          </div>
          <div class="col-10">
            <DataLiveBoard :sensorList="sensorList" :location="location"/>
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
      location: {lon: 2, lat: 48},
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
      isLoading: true,
    }
  },
  mounted(){
    // fetch('http://piensg028.ensg.eu:3000/live', { 
    //   mode:'no-cors',
    //   headers: {
    //     "Content-Type": 'application/json',
    //   }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));


    fetch("./live2.json")
      .then(response => response.json())
      .then(json => {
        this.dataLive=json;
        this.location = {'lon': json.data.long, 'lat': json.data.lat};
      });
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
    maj_station(newStationName){
      this.stationName = newStationName;
    },
    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString();
      }, 1_000);
    }
  },
}

</script>

