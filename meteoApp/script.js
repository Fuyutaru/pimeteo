import chokidar from 'chokidar';
import fs from 'fs';
import {InfluxDB, Point} from '@influxdata/influxdb-client';
// import nmea from 'node-nmea';
import nmea from 'nmea-simple'

let temp_data ={}

let rain_value;

let interval = 30000;

const watcher = chokidar.watch('/dev/shm/sensors', {
    persistent: true,
  });

const tpg_watcher = chokidar.watch('/dev/shm/tpg.log', {
  persistent: true,
});

const rain_watcher = chokidar.watch('/dev/shm/rainCounter.log', {
  persistent: true,
});

const gps_watcher = chokidar.watch('/dev/shm/gpsNmea', {
  persistent: true,
});

function addData(){
  const token = 'wn_EZ-uLnCtL68y6T-d8pshTw-S7bAa7mNnyAWIkvWT8OgEIuegAS5xGSKakJbjLEmsVGzrY0wxUFWdbB4lzMA==';
  const url = 'http://localhost:8086'

  const client = new InfluxDB({url, token})

  let org = `ign`
  let bucket = `meteo`

  let writeClient = client.getWriteApi(org, bucket, 'ns')

  for (const [key, value] of Object.entries(temp_data)){
    const point = new Point(key)
      .floatField('value', value)

    writeClient.writePoint(point)
    writeClient.flush()
  }

  setTimeout(addData, interval);

}




// watcher.add(['/dev/shm/sensors', '/dev/shm/rainCounter.log', '/dev/shm/gpsNmea', '/dev/shm/tpg.log'])

watcher.on('change', ()=>{

    // const token = process.env.INFLUXDB_TOKEN
    const token = 'Byq6-sNdEOsj6q-KA8GXj1F3iB6qHcKMnuVa3Vy4fBTwf-LjtzQU0-IQkGCAdbvXTplpaGgq14o5kB7kjbrCCg==';
    const url = 'http://localhost:8086'

    const client = new InfluxDB({url, token})

    let org = `ign`
    let bucket = `meteo`

    let writeClient = client.getWriteApi(org, bucket, 'ns')



    fs.readFile('/dev/shm/sensors', (err, data) => {
        if (err) {
          console.error('Problème de lecture:', err);
          return;
        }


      
        try {
          const jsonData = JSON.parse(data);
          jsonData.measure.forEach(element => {
            temp_data[element["name"]] = element["value"];
          });



          // const jsonData = JSON.parse(data);
          // console.log(jsonData.measure[1]["value"]);

          // jsonData.measure.forEach(element => {
          //   const point = new Point(element["name"])
          //     .floatField('value', element["value"])



          // void setTimeout(() => {
          //   writeClient.writePoint(point)
          // }, 1000) // separate points by 1 second

          // void setTimeout(() => {
          //   writeClient.flush()
          // }, 5000)
          // });

        
          }
       
        catch (err) {
          console.error('Error parsing JSON:', err);
        }
      });


})


tpg_watcher.on('change', ()=>{

  // const token = process.env.INFLUXDB_TOKEN
  const token = 'Byq6-sNdEOsj6q-KA8GXj1F3iB6qHcKMnuVa3Vy4fBTwf-LjtzQU0-IQkGCAdbvXTplpaGgq14o5kB7kjbrCCg==';
  const url = 'http://localhost:8086'

  const client = new InfluxDB({url, token})

  let org = `ign`
  let bucket = `meteo`

  let writeClient = client.getWriteApi(org, bucket, 'ns')


  fs.readFile('/dev/shm/tpg.log', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);

      for (const [key, value] of Object.entries(jsonData)){
        if (key != "date" || key != "hygro"){
          temp_data[key] = value;

          // const point = new Point(key)
          //   .floatField('value', value)

          
          // void setTimeout(() => {
          //   writeClient.writePoint(point)
          // }, 1000) // separate points by 1 second

          // void setTimeout(() => {
          //   writeClient.flush()
          // }, 5000)

        }
      }
    
      }
    
    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

})


rain_watcher.on('change', ()=>{

  // const token = process.env.INFLUXDB_TOKEN
  const token = 'Byq6-sNdEOsj6q-KA8GXj1F3iB6qHcKMnuVa3Vy4fBTwf-LjtzQU0-IQkGCAdbvXTplpaGgq14o5kB7kjbrCCg==';
  const url = 'http://localhost:8086'

  const client = new InfluxDB({url, token})

  let org = `ign`
  let bucket = `meteo`

  let writeClient = client.getWriteApi(org, bucket, 'ns')


  fs.readFile('/dev/shm/rainCounter.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }
  
    try {
      console.log(data);
      if (!("pluv" in temp_data)){
        temp_data["pluv"] = 0.328;
        rain_value = data;
      }
      else{
        if(rain_value != data){
          temp_data["pluv"] += 0.328;
          rain_value = data;
        }
      }

      console.log(temp_data)
    
    }
    
    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });


})

gps_watcher.on('change', ()=>{

  fs.readFile('/dev/shm/gpsNmea', 'utf8', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }
  

    try {
      let raw = data.split("\n")[1];
      const parsed = nmea.parseNmeaSentence(raw);

      if (parsed.latitude !== undefined && parsed.longitude !== undefined) {
          console.log(`Latitude (DD): ${parsed.latitude.toFixed(3)}`);
          console.log(`Longitude (DD): ${parsed.longitude.toFixed(3)}`);
          let lat = parsed.latitude.toFixed(3);
          let lon = parsed.longitude.toFixed(3);

          temp_data["lat"] = lat;
          temp_data["lon"] = lon;

          console.log(temp_data)


      } else {
          console.log("No latitude/longitude in this sentence.");
      }
    } 
    
    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });


})


// setTimeout(() => {
//   if (!(Object.keys(temp_data).length === 0)){
//     const token = 'Byq6-sNdEOsj6q-KA8GXj1F3iB6qHcKMnuVa3Vy4fBTwf-LjtzQU0-IQkGCAdbvXTplpaGgq14o5kB7kjbrCCg==';
//     const url = 'http://localhost:8086'

//     const client = new InfluxDB({url, token})

//     let org = `ign`
//     let bucket = `meteo`

//     let writeClient = client.getWriteApi(org, bucket, 'ns')

//     for (const [key, value] of Object.entries(temp_data)){
//       const point = new Point(key)
//         .floatField('value', value)

//       writeClient.writePoint(point)
//       writeClient.flush()
//     }
//   }
// }, interval);

addData();