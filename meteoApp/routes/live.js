var express = require('express');
var router = express.Router();

// repl.repl.ignoreUndefined=true

const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})



/* GET home page. */
router.get('/live', function(req, res, next) {
//   res.render('live', { title: 'Express' });
    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "meteo")
    |> range(start: -100y)`

    queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row)
          console.log(tableObject)
        },
        error: (error) => {
          console.error('\nError', error)
          res.render('error')
        },
        complete: () => {
          console.log('\nSuccess')
          console.log(tableObject)
          res.json(tableObject);
        },
      })


});



module.exports = router;