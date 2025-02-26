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
              <MenuApp @updateSensor="maj_sensor" />
          </div>
          <div class="col-10">
            <DataLiveBoard :sensorData="sensorData" :location="location"/>
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
      sensorData: [],
      dataLive: {},
      timestamp: "",
      location: {lon: 0, lat: 0},
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
    // fetch("./live2.json")
    //   .then(response => response.json())
    //   .then(json => {
    //     this.dataLive=json;
    //     this.location = {'lon': json.data.long, 'lat': json.data.lat};
    //   });

    this.get_date();
  },
  watch: {
    timestamp(newVal) {
      const minute = new Date(newVal).getMinutes();
      if (minute % 10 === 0){
        console.log("time to fetch");
      }
    },
    dataLive() {

      if (this.sensorList.includes('lat-lon')) {
        this.location = {'lon': this.dataLive.data.lon, 'lat': this.dataLive.data.lat};
      }
      this.sensorData = this.sensorList.filter(e => e !== 'lat-lon').map(sensor => {
        return {
          name: this.sensorName[sensor],
          val: `${this.dataLive.data[sensor]} ${this.dataLive.unit[sensor]}`,
          url: this.sensorIcon[sensor],
        }
      });
    }
  },
  methods: {
    maj_sensor(sensorSelected) {
      if (sensorSelected.includes('all')) {
        this.sensorList = Object.keys(this.sensorName);
        this.sensorList.push('lat-lon');
      }
      else {
        this.sensorList = sensorSelected.filter(e => e !== 'location' && e !== 'all');
        this.location = {lon: 0, lat: 0};
      }
      if (sensorSelected.includes('location')) {
        this.sensorList.push('lat-lon');
      }
      this.fetchDataLive();
    },

    maj_station(newStationName){
      this.stationName = newStationName;
      this.fetchDataLive();
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString();
      }, 1_000);
    },
    
    async fetchDataLive() {
      try {
        const response = await fetch(`http://piensg0${this.stationName.split(' ')[1]}.ensg.eu:3000/live/${this.sensorList.join('-')}`);
        if (response.ok) {
            this.dataLive = await response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
      } catch (error) {
          console.error('Error:', error); 
        }
    }
  },
}

</script>

