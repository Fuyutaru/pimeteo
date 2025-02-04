var express = require('express');
var router = express.Router();

repl.repl.ignoreUndefined=true

const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})

let queryClient = client.getQueryApi(org)
let fluxQuery = `from(bucket: "meteo")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`

/* GET home page. */
router.get('/live', function(req, res, next) {
//   res.render('live', { title: 'Express' });
    
});



module.exports = router;