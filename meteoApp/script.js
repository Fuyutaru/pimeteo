const chokidar = require('chokidar');
const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const nmea = require('nmea-simple')

let temp_data = {}

let rain_value;

let interval = 30000;

const watcher = chokidar.watch('/dev/shm/sensors', {
  persistent: true,
});

const tph_watcher = chokidar.watch('/dev/shm/tph.log', {
  persistent: true,
});

const rain_watcher = chokidar.watch('/dev/shm/rainCounter.log', {
  persistent: true,
});

const gps_watcher = chokidar.watch('/dev/shm/gpsNmea', {
  persistent: true,
});

function addData() {
  if (!(temp_data.length === 0)) {
    // raspi

    const token = 'F8bh5nAMrb7zo43oTtPIvZxES2EtdceLvJ4lWld4k9Se10047DgpMitlNhEw2PkHtkjjDLxY-MVrhsTpK5jLDA==';
    // const token = process.env.INFLUXDB_TOKEN

    // zijian
    // const token = 'sf70vN5suVwlorMq1IBkAmzMLb7Bu4OPOxT4oDFwVCw3GvgsTTrkQQ_SgjRMesQSIxBtqk5sFnf5e_jIdtp1Mg==';
    // z remote
    // const token = '-RwrWLE9aurMT4_twlKp5XXb1xeWol_BC5gJMb9HgQLZqf8JdYUPYfOZJP0jnsZ1wBk5323FWVWXxtUCL6lrmA==';
    const url = 'http://localhost:8086';

    const client = new InfluxDB({ url, token });

    let org = `ign`;
    let bucket = `meteo`;

    let writeClient = client.getWriteApi(org, bucket, 'ns');

    for (const [key, value] of Object.entries(temp_data)) {
      const point = new Point(key).floatField('value', value);
      writeClient.writePoint(point);
      console.log(`Writing point: ${key} = ${value}`);
    }

    writeClient.flush().then(() => {
      console.log('Data flushed successfully');
    }).catch(err => {
      console.error('Error flushing data:', err);
    });
  }
  setTimeout(addData, interval);
}



watcher.on('change', () => {

  fs.readFile('/dev/shm/sensors', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData.measure.forEach(element => {
        if (element["name"] != "temperature" || element["name"] != "pressure") {
          temp_data[element["name"]] = element["value"];
        }
      });

    }

    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });


})


tph_watcher.on('change', () => {

  fs.readFile('/dev/shm/tph.log', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      for (const [key, value] of Object.entries(jsonData)) {
        if (key != "date" || key != "hygro") {
          temp_data[key] = value;

        }
      }

    }

    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

})


rain_watcher.on('change', () => {


  fs.readFile('/dev/shm/rainCounter.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }

    try {
      if (!("rain" in temp_data)) {
        temp_data["rain"] = 0.328;
        rain_value = data;
      }
      else {
        if (rain_value != data) {
          temp_data["rain"] += 0.328;
          rain_value = data;
        }
      }


    }

    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });


})

gps_watcher.on('change', () => {

  fs.readFile('/dev/shm/gpsNmea', 'utf8', (err, data) => {
    if (err) {
      console.error('Problème de lecture:', err);
      return;
    }


    try {
      let raw = data.split("\n")[1];
      const parsed = nmea.parseNmeaSentence(raw);

      if (parsed.latitude !== undefined && parsed.longitude !== undefined) {
        let lat = parsed.latitude.toFixed(3);
        let lon = parsed.longitude.toFixed(3);
        temp_data["lat"] = lat;
        temp_data["lon"] = lon;
      } else {
        console.log("No latitude/longitude in this sentence.");
      }
    }

    catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });


})

addData();