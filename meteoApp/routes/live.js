var express = require('express');
var router = express.Router();

let org = `ign`
let bucket = `meteo`
const { InfluxDB, Point } = require('@influxdata/influxdb-client')

// raspi
const token = 'F8bh5nAMrb7zo43oTtPIvZxES2EtdceLvJ4lWld4k9Se10047DgpMitlNhEw2PkHtkjjDLxY-MVrhsTpK5jLDA==';
// const token = process.env.INFLUXDB_TOKEN
console.log("token", token)
// zijian
// const token = 'sf70vN5suVwlorMq1IBkAmzMLb7Bu4OPOxT4oDFwVCw3GvgsTTrkQQ_SgjRMesQSIxBtqk5sFnf5e_jIdtp1Mg==';
const url = 'http://localhost:8086'

const client = new InfluxDB({ url, token })



/* GET home page. */
router.get('/', async function (req, res, next) {
  console.log("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "meteo") 
    |> range(start: -1h) // Fetch last 1 hour (ensures we have recent data)
    |> last() // Get the most recent values for each field`

  try {
    let results = [];

    // Execute the query
    for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {
      results.push(values);
    }
    console.log("results", results)


    const formattedResult = {
      id: 28,
      unit: {
        temperature: "C",
        pressure: "hP",
        humidity: "%",
        rain: "mm/m2",
        luminosity: "Lux",
        wind_heading: "°",
        wind_speed_avg: "km/h",
        lat: "DD",
        lon: "DD"
      },
      data: {
        date: results[0][2], // Adjust according to your data structure
        temperature: parseFloat(results.find(row => row[7] === "temp")[5]),
        pressure: parseFloat(results.find(row => row[7] === "press")[5]),
        humidity: parseFloat(results.find(row => row[7] === "humidity")[5]),
        luminosity: parseFloat(results.find(row => row[7] === "luminosity")[5]),
        wind_heading: parseFloat(results.find(row => row[7] === "wind_heading")[5]),
        wind_speed_avg: parseFloat(results.find(row => row[7] === "wind_speed_avg")[5]),
        rain: parseFloat(results.find(row => row[7] === "rain")[5]),
        lat: parseFloat(results.find(row => row[7] === "lat")[5]), // Static value as per your example
        lon: parseFloat(results.find(row => row[7] === "lon")[5])  // Static value as per your example
      }
    };

    res.json(formattedResult);
    // console.log("All Data:", results);
  } catch (error) {
    console.error("Error fetching data:", error);
    let e = {
      "message": "The requested station is not in the database"
    }
    res.json(e);
  }


});



router.get('/:list_capteur', async function (req, res, next) {
  // const listCapteur = req.params.list_capteur.split('-');
  let queryClient = client.getQueryApi(org);
  let fluxQuery = `from(bucket: "meteo") 
      |> range(start: -1h) // Fetch last 1 hour (ensures we have recent data)
      |> last() // Get the most recent values for each field`;

  try {

    const listCapteur = req.params.list_capteur.split('-');
    const validCapteurs = ['temperature', 'pressure', 'humidity', 'luminosity', 'wind_heading', 'wind_speed_avg', 'rain', 'lat', 'lon'];

    // Validate the listCapteur
    for (const capteur of listCapteur) {
      if (!validCapteurs.includes(capteur)) {
        throw new Error('Invalid query argument');
      }
    }

    let results = [];
    for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {
      results.push(values);
    }

    // Initialize the formatted result
    const formattedResult = {
      id: 28,
      unit: {},
      data: {
        date: results[0][2] // Adjust according to your data structure
      }
    };

    // Define the units for each possible field
    const units = {
      temperature: "C",
      pressure: "hP",
      humidity: "%",
      rain: "mm/m2",
      luminosity: "Lux",
      wind_heading: "°",
      wind_speed_avg: "km/h",
      lat: "DD",
      lon: "DD"
    };

    // Add only the requested fields to the unit and data objects
    listCapteur.forEach(capteur => {
      if (units[capteur]) {
        formattedResult.unit[capteur] = units[capteur];
      }
      console.log("capteur", capteur)
      switch (capteur) {
        case 'temperature':
          console.log("temperature ouiiiiiiiiiiiii")
          formattedResult.data.temperature = parseFloat(results.find(row => row[7] === "temp")[5]);
          break;
        case 'pressure':
          formattedResult.data.pressure = parseFloat(results.find(row => row[7] === "pressure")[5]);
          break;
        case 'humidity':
          formattedResult.data.humidity = parseFloat(results.find(row => row[7] === "humidity")[5]);
          break;
        case 'luminosity':
          formattedResult.data.luminosity = parseFloat(results.find(row => row[7] === "luminosity")[5]);
          break;
        case 'wind_heading':
          formattedResult.data.wind_heading = parseFloat(results.find(row => row[7] === "wind_heading")[5]);
          break;
        case 'wind_speed_avg':
          formattedResult.data.wind_speed_avg = parseFloat(results.find(row => row[7] === "wind_speed_avg")[5]);
          break;
        case 'rain':
          formattedResult.data.rain = parseFloat(results.find(row => row[7] === "rain")[5]);
          break;
        case 'lat':
          formattedResult.data.lat = parseFloat(results.find(row => row[7] === "lat")[5]);
          break;
        case 'lon':
          formattedResult.data.lon = parseFloat(results.find(row => row[7] === "lon")[5]);
          break;
        default:
          break;
      }
    });

    res.json(formattedResult);
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.message === 'Invalid query argument') {
      res.status(400).json({ message: "A query argument is invalid" });
    } else {
      res.status(404).json({ message: "The requested station is not in the database" });
    }
  }
});



module.exports = router;