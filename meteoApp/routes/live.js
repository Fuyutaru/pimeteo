var express = require('express');
var router = express.Router();

let org = `ign`
let bucket = `meteo`
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = 'Byq6-sNdEOsj6q-KA8GXj1F3iB6qHcKMnuVa3Vy4fBTwf-LjtzQU0-IQkGCAdbvXTplpaGgq14o5kB7kjbrCCg==';
const url = 'http://localhost:8086'

const client = new InfluxDB({url, token})



/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "meteo") 
    |> range(start: -1h) // Fetch last 1 hour (ensures we have recent data)
    |> last() // Get the most recent values for each field`
  let tableObject;
  // queryClient.queryRows(fluxQuery, {
  //     next: (row, tableMeta) => {
  //       tableObject = tableMeta.toObject(row)
  //       // console.log(tableObject)
  //     },
  //     error: (error) => {
  //       console.error('\nError', error)
  //       res.render('error')
  //     },
  //     complete: () => {
  //       console.log('\nSuccess')
  //       console.log(tableObject)
  //       res.json(tableObject);
  //     },
  //   })

    try {
        let results = [];
        a = queryClient.collectLines(fluxQuery)
        console.log(a)

        // Execute the query
        for await (const { values, table } of queryClient.iterateRows(fluxQuery)) {
            results.push(values);
        }
        res.json(results);
        // console.log("All Data:", results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }


});



module.exports = router;