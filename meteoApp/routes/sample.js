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
// const token = '-RwrWLE9aurMT4_twlKp5XXb1xeWol_BC5gJMb9HgQLZqf8JdYUPYfOZJP0jnsZ1wBk5323FWVWXxtUCL6lrmA==';
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
                // if (validTypes.includes(type)) {
                //     if (!formattedData.data[timestamp]) {
                //         formattedData.data[timestamp] = { date: timestamp };
                //     }
                //     formattedData.data[timestamp][type] = parseFloat(value);
                // }
                if (validTypes.includes(type)) {
                    // if (!formattedData.data[timestamp]) {
                    //     // formattedData.data[timestamp] = { date: timestamp };
                    // }
                    console.log(type);
                    if (type != "date") {
                        formattedData.data[timestamp][type] = parseFloat(value);
                    }

                }
            });

            return formattedData;
        };

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
                if (validTypes.includes(type)) {
                    if (!formattedData.data[timestamp]) {
                        formattedData.data[timestamp] = { date: timestamp };
                    }
                    formattedData.data[timestamp][type] = parseFloat(value);
                }
            });

            return formattedData;
        };

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
    let fluxQuery = `from(bucket: "meteo")
        |> range(start: ${req.params.start}, stop: now())`;

    if (!isValidDateFormat(req.params.start)) {
        return res.status(400).json({ message: "Invalid query argument" });
    }

    try {
        const listCapteur = req.params.list_capteur.split('-');
        const validCapteurs = ['temperature', 'pressure', 'humidity', 'luminosity', 'wind_heading', 'wind_speed_avg', 'rain', 'lat', 'lon'];

        for (const capteur of listCapteur) {
            if (!validCapteurs.includes(capteur)) {
                throw new Error('Invalid query argument');
            }
        }

        let results = [];
        for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {
            results.push(values);
        }

        const formattedResult = {
            id: 28,
            unit: {},
        };

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

        listCapteur.forEach(capteur => {
            if (units[capteur]) {
                formattedResult.unit[capteur] = units[capteur];
            }
        });

        results.forEach(row => {
            let date = row[4];
            date = truncateToSecond(date);
            if (!formattedResult[date]) {
                formattedResult[date] = { date };
            }
            listCapteur.forEach(capteur => {
                switch (capteur) {
                    case 'temperature':
                        if (row[7] === "temp") {
                            formattedResult[date].temperature = parseFloat(row[5]);
                        }
                        break;
                    case 'pressure':
                        if (row[7] === "pressure") {
                            formattedResult[date].pressure = parseFloat(row[5]);
                        }
                        break;
                    case 'humidity':
                        if (row[7] === "humidity") {
                            formattedResult[date].humidity = parseFloat(row[5]);
                        }
                        break;
                    case 'luminosity':
                        if (row[7] === "luminosity") {
                            formattedResult[date].luminosity = parseFloat(row[5]);
                        }
                        break;
                    case 'wind_heading':
                        if (row[7] === "wind_heading") {
                            formattedResult[date].wind_heading = parseFloat(row[5]);
                        }
                        break;
                    case 'wind_speed_avg':
                        if (row[7] === "wind_speed_avg") {
                            formattedResult[date].wind_speed_avg = parseFloat(row[5]);
                        }
                        break;
                    case 'rain':
                        if (row[7] === "rain") {
                            formattedResult[date].rain = parseFloat(row[5]);
                        }
                        break;
                    case 'lat':
                        if (row[7] === "lat") {
                            formattedResult[date].lat = parseFloat(row[5]);
                        }
                        break;
                    case 'lon':
                        if (row[7] === "lon") {
                            formattedResult[date].lon = parseFloat(row[5]);
                        }
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



router.get('/:start/:stop/:list_capteur', async function (req, res, next) {
    let queryClient = client.getQueryApi(org);
    let fluxQuery = `from(bucket: "meteo")
        |> range(start: ${req.params.start}, stop: ${req.params.stop})`;

    if (!isValidDateFormat(req.params.start)) {
        return res.status(400).json({ message: "Invalid query argument" });
    }

    try {
        const listCapteur = req.params.list_capteur.split('-');
        const validCapteurs = ['temperature', 'pressure', 'humidity', 'luminosity', 'wind_heading', 'wind_speed_avg', 'rain', 'lat', 'lon'];

        for (const capteur of listCapteur) {
            if (!validCapteurs.includes(capteur)) {
                throw new Error('Invalid query argument');
            }
        }

        let results = [];
        for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {
            results.push(values);
        }

        const formattedResult = {
            id: 28,
            unit: {},
        };

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

        listCapteur.forEach(capteur => {
            if (units[capteur]) {
                formattedResult.unit[capteur] = units[capteur];
            }
        });

        results.forEach(row => {
            let date = row[4];
            date = truncateToSecond(date);
            if (!formattedResult[date]) {
                formattedResult[date] = { date };
            }
            listCapteur.forEach(capteur => {
                switch (capteur) {
                    case 'temperature':
                        if (row[7] === "temp") {
                            formattedResult[date].temperature = parseFloat(row[5]);
                        }
                        break;
                    case 'pressure':
                        if (row[7] === "pressure") {
                            formattedResult[date].pressure = parseFloat(row[5]);
                        }
                        break;
                    case 'humidity':
                        if (row[7] === "humidity") {
                            formattedResult[date].humidity = parseFloat(row[5]);
                        }
                        break;
                    case 'luminosity':
                        if (row[7] === "luminosity") {
                            formattedResult[date].luminosity = parseFloat(row[5]);
                        }
                        break;
                    case 'wind_heading':
                        if (row[7] === "wind_heading") {
                            formattedResult[date].wind_heading = parseFloat(row[5]);
                        }
                        break;
                    case 'wind_speed_avg':
                        if (row[7] === "wind_speed_avg") {
                            formattedResult[date].wind_speed_avg = parseFloat(row[5]);
                        }
                        break;
                    case 'rain':
                        if (row[7] === "rain") {
                            formattedResult[date].rain = parseFloat(row[5]);
                        }
                        break;
                    case 'lat':
                        if (row[7] === "lat") {
                            formattedResult[date].lat = parseFloat(row[5]);
                        }
                        break;
                    case 'lon':
                        if (row[7] === "lon") {
                            formattedResult[date].lon = parseFloat(row[5]);
                        }
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