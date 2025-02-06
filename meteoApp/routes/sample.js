var express = require('express');
var router = express.Router();

let org = `ign`
let bucket = `meteo`
const { InfluxDB, Point } = require('@influxdata/influxdb-client')

// raspi
const token = 'F8bh5nAMrb7zo43oTtPIvZxES2EtdceLvJ4lWld4k9Se10047DgpMitlNhEw2PkHtkjjDLxY-MVrhsTpK5jLDA==';
// zijian
// const token = 'sf70vN5suVwlorMq1IBkAmzMLb7Bu4OPOxT4oDFwVCw3GvgsTTrkQQ_SgjRMesQSIxBtqk5sFnf5e_jIdtp1Mg==';
// z remote
// const token = 's076x-F1ekJrKhXBBujoQe27pY11lrQ1s8No3-mKceTYg9ZBla1qY4UU0tkx85G57aHk7iZbSOfJq0yYicNgew==';
const url = 'http://localhost:8086'

const client = new InfluxDB({ url, token })

function truncateToSecond(timestamp) {
    const date = new Date(timestamp);
    date.setMilliseconds(0);
    return date.toISOString();
}

function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return regex.test(dateString);
}

/* GET home page. */
router.get('/:start/now', async (req, res) => {
    // chercher les données entre req.params.start et maintenant
    let queryClient = client.getQueryApi(org);
    let fluxQuery = `from(bucket: "meteo")
        |> range(start: ${req.params.start}, stop: now())`;

    if (!isValidDateFormat(req.params.start)) {
        throw new Error('Invalid query argument');
    }


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

    if (!isValidDateFormat(req.params.start)) {
        throw new Error('Invalid query argument');
    }


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


router.get('/:start/now/:list_capteur', async function (req, res, next) {
    let queryClient = client.getQueryApi(org);
    let start = req.params.start;
    let fluxQuery = `from(bucket: "meteo")
          |> range(start: ${req.params.start}, stop: now())`;

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
            console.log("values", values)
        }

        // Initialize the formatted result
        const formattedResult = {
            id: 28,
            unit: {},
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

        // Add only the requested fields to the unit object
        listCapteur.forEach(capteur => {
            if (units[capteur]) {
                formattedResult.unit[capteur] = units[capteur];
            }
        });

        // Add data for each timestamp
        results.forEach(row => {
            const timestamp = row[2];
            formattedResult[timestamp] = { date: timestamp };
            listCapteur.forEach(capteur => {
                switch (capteur) {
                    case 'temperature':
                        formattedResult[timestamp].temperature = parseFloat(row.find(col => col === "temp")[5]);
                        break;
                    case 'pressure':
                        formattedResult[timestamp].pressure = parseFloat(row.find(col => col === "pressure")[5]);
                        break;
                    case 'humidity':
                        formattedResult[timestamp].humidity = parseFloat(row.find(col => col === "humidity")[5]);
                        break;
                    case 'luminosity':
                        formattedResult[timestamp].luminosity = parseFloat(row.find(col => col === "luminosity")[5]);
                        break;
                    case 'wind_heading':
                        formattedResult[timestamp].wind_heading = parseFloat(row.find(col => col === "wind_heading")[5]);
                        break;
                    case 'wind_speed_avg':
                        formattedResult[timestamp].wind_speed_avg = parseFloat(row.find(col => col === "wind_speed_avg")[5]);
                        break;
                    case 'rain':
                        formattedResult[timestamp].rain = parseFloat(row.find(col => col === "rain")[5]);
                        break;
                    case 'lat':
                        formattedResult[timestamp].lat = parseFloat(row.find(col => col === "lat")[5]);
                        break;
                    case 'lon':
                        formattedResult[timestamp].lon = parseFloat(row.find(col => col === "lon")[5]);
                        break;
                    default:
                        break;
                }
            });
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