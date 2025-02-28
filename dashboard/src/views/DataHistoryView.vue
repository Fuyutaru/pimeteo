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
              <div v-if="sensorList.length !== 0">
                <MenuDate @updateTimeRange="maj_timeRange"/>
              </div>
              <div v-else>
                <div class="alert alert-warning d-flex align-items-center mt-4" role="alert">
                    Please select at least one sensor
                </div>
              </div>
              
          </div>
          <div class="col-10">
            <DataHistoryBoard :sensorData="sensorData" :location="location"/>
          </div>
      </div>
  </div>
</template>
  
<script>
import HeaderApp from '@/components/HeaderApp.vue'
import MenuApp from '@/components/MenuApp.vue'
import DataHistoryBoard from '@/components/DataHistoryBoard.vue'
import TemperatureIcon from '@/assets/temperature.png'
import InfoStation from '@/components/InfoStation.vue'
import LumIcon from '@/assets/luminosity.png'
import HumIcon from '@/assets/humidity.png'
import PrecipIcon from '@/assets/precipitation.png'
import HeadIcon from '@/assets/wind_head.png'
import SpeedIcon from '@/assets/wind_speed.png'
import PressIcon from '@/assets/pressure.png'
import MenuDate from '@/components/MenuDate.vue'
  
export default {
  components: {
    HeaderApp,
    InfoStation,
    MenuApp,
    MenuDate,
    DataHistoryBoard,
  },
  data() {
    return {
      sensorList: [],
      sensorData: [],
      dataHistory: {},
      timestamp: "",
      timerange: {start: '', stop: ''},
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
    this.get_date();
  },
  watch: {
    timestamp(newVal) {
      const minute = new Date(newVal).getMinutes();
      if (minute % 10 === 0){
        console.log("time to fetch");
      }
    },
    dataHistory() {
      // if (this.sensorList.includes('lat-lon')) {
      //   this.location = {'lon': this.dataHistory.data.lon, 'lat': this.dataHistory.data.lat};
      // }
      // this.sensorData = this.sensorList.filter(e => e !== 'lat-lon').map(sensor => {
      //   return {
      //     name: this.sensorName[sensor],
      //     val: `${this.dataHistory.data[sensor]} ${this.dataHistory.unit[sensor]}`,
      //     url: this.sensorIcon[sensor],
      //   }
      // });
      console.log(this.sensorList);
      console.log(this.timerange);
      console.log(this.dataHistory);
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
    },

    maj_station(newStationName){
      this.stationName = newStationName;
    },

    maj_timeRange(newTimerange) {
      this.timerange = newTimerange;
      this.fetchDataLive();
    },

    get_date() {
      setInterval(() => {
        this.timestamp = new Date().toISOString();
      }, 1_000);
    },

    // fetchDataLive() {
    //   fetch("./live2.json")
    //     .then(response => response.json())
    //     .then(json => {
    //       this.dataHistory=json;
    //     });
    // },
    
    async fetchDataLive() {
      try {
        const station = `http://piensg0${this.stationName.split(' ')[1]}.ensg.eu:3000/sample`;
        const time = `${this.timerange.start}/${this.timerange.stop}`;
        const sensor = this.sensorList.join('-');
        const route = `${station}/${time}/${sensor}`;

        const response = await fetch(route);
        if (response.ok) {
          console.log(route)
          this.dataHistory = await response.json();
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


  