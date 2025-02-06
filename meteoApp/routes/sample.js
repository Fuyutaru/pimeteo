var express = require('express');
var router = express.Router();

let org = `ign`
let bucket = `meteo`
const { InfluxDB, Point } = require('@influxdata/influxdb-client')

// raspi
// const token = 'wn_EZ-uLnCtL68y6T-d8pshTw-S7bAa7mNnyAWIkvWT8OgEIuegAS5xGSKakJbjLEmsVGzrY0wxUFWdbB4lzMA==';
// zijian
// const token = 'sf70vN5suVwlorMq1IBkAmzMLb7Bu4OPOxT4oDFwVCw3GvgsTTrkQQ_SgjRMesQSIxBtqk5sFnf5e_jIdtp1Mg==';
// z remote
const token = 's076x-F1ekJrKhXBBujoQe27pY11lrQ1s8No3-mKceTYg9ZBla1qY4UU0tkx85G57aHk7iZbSOfJq0yYicNgew==';
const url = 'http://localhost:8086'

const client = new InfluxDB({ url, token })

function truncateToSecond(timestamp) {
    const date = new Date(timestamp);
    date.setMilliseconds(0);
    return date.toISOString();
}

/* GET home page. */
router.get('/:start/now', async (req, res) => {
    // chercher les données entre req.params.start et maintenant
    let queryClient = client.getQueryApi(org);
    let fluxQuery = `from(bucket: "meteo")
        |> range(start: ${req.params.start}, stop: now())`;


    try {
        let results = [];
        for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {

            results.push(values);
        }
        const formatResults = (results) => {
            const formattedData = {
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
                data: {}
            };

            const validTypes = ['temp', 'press', 'humidity', 'luminosity', 'wind_heading', 'wind_speed_avg', 'rain', 'lat', 'lon'];

            results.forEach(row => {
                const [, , , , times, value, , type] = row;
                const timestamp = truncateToSecond(times);
                console.log(timestamp);
                if (validTypes.includes(type)) {
                    console.log("yessssss")
                    if (!formattedData.data[timestamp]) {
                        console.log("nooooooooo")
                        formattedData.data[timestamp] = { date: timestamp };
                    }
                    formattedData.data[timestamp][type] = parseFloat(value);
                }
            });

            return formattedData;
        };

        // res.json(results);
        res.json(formatResults(results));

    } catch (error) {
        console.error("Error fetching data:", error);
        if (error.message === 'Invalid query argument') {
            res.status(400).json({ message: "A query argument is invalid" });
        } else {
            res.status(404).json({ message: "The requested station is not in the database" });
        }
    }
});


router.get('/:start/:stop', async (req, res) => {
    // chercher les données entre req.params.start et maintenant
    let queryClient = client.getQueryApi(org);
    let fluxQuery = `from(bucket: "meteo")
        |> range(start: ${req.params.start}, stop: ${req.params.stop})`;


    try {
        let results = [];
        for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {

            results.push(values);
        }
        const formatResults = (results) => {
            const formattedData = {
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
                data: {}
            };

            const validTypes = ['temp', 'press', 'humidity', 'luminosity', 'wind_heading', 'wind_speed_avg', 'rain', 'lat', 'lon'];

            results.forEach(row => {
                const [, , , , times, value, , type] = row;
                const timestamp = truncateToSecond(times);
                console.log(timestamp);
                if (validTypes.includes(type)) {
                    console.log("yessssss")
                    if (!formattedData.data[timestamp]) {
                        console.log("nooooooooo")
                        formattedData.data[timestamp] = { date: timestamp };
                    }
                    formattedData.data[timestamp][type] = parseFloat(value);
                }
            });

            return formattedData;
        };

        // res.json(results);
        res.json(formatResults(results));

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