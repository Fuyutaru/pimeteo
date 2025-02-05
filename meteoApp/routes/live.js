var express = require('express');
var router = express.Router();

let org = `ign`
let bucket = `meteo`
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

// raspi
// const token = 'wn_EZ-uLnCtL68y6T-d8pshTw-S7bAa7mNnyAWIkvWT8OgEIuegAS5xGSKakJbjLEmsVGzrY0wxUFWdbB4lzMA==';
// zijian
const token = 'sf70vN5suVwlorMq1IBkAmzMLb7Bu4OPOxT4oDFwVCw3GvgsTTrkQQ_SgjRMesQSIxBtqk5sFnf5e_jIdtp1Mg==';
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})



/* GET home page. */
router.get('/', async function(req, res, next) {
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
    }


});



module.exports = router;