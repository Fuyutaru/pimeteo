import chokidar from 'chokidar';
import fs from 'fs';
import {InfluxDB, Point} from '@influxdata/influxdb-client';

const watcher = chokidar.watch('file, dir, or array', {
    persistent: true
  });

watcher.add(['/dev/shm/sensors', '/dev/shm/rainCounter.log', '/dev/shm/gpsNmea', '/dev/shm/tpg.log'])

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
          console.log(jsonData.measure[1]["value"]);

          jsonData.measure.forEach(element => {
            const point = new Point(element["name"])
              .floatField('value', element["value"])


            void setTimeout(() => {
              writeClient.writePoint(point)
            }, 1000) // separate points by 1 second

            void setTimeout(() => {
              writeClient.flush()
            }, 5000)
          });

        
          }
       
        catch (err) {
          console.error('Error parsing JSON:', err);
        }
      });


    fs.readFile('/dev/shm/tpg.log', (err, data) => {
      if (err) {
        console.error('Problème de lecture:', err);
        return;
      }
    
      try {
        const jsonData = JSON.parse(data);
        console.log(jsonData.measure[1]["value"]);

        jsonData.measure.forEach(element => {
          const point = new Point(element["name"])
            .floatField('value', element["value"])


          void setTimeout(() => {
            writeClient.writePoint(point)
          }, 1000) // separate points by 1 second

          void setTimeout(() => {
            writeClient.flush()
          }, 5000)
        });

      
        }
      
      catch (err) {
        console.error('Error parsing JSON:', err);
      }
    });



})
