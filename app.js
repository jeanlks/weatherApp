const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode')
const weather = require('./weather');
var dateTime = require('node-datetime');
const express = require('express');

var app = express();

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather.',
            string: true
        }
    })
    .options({
        s: {
            demand: false,
            alias: 'seconds',
            describe: 'Values for seconds to interval.'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var seconds = 1;
var repetitions = 1;
if(argv.seconds) {
    seconds = argv.seconds;
}
if (argv.repetitions) {
    repetitions = argv.repetitions;
}
 app.get('/', (req, res) => {

 geocode.geocodeAddress(argv.address, (errorMessage, results ) => {
   if(errorMessage) {
       console.log(errorMessage);
   } else {
       weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResult) => {
            if(errorMessage){
                console.log(errorMessage);
            }else {
              var dt = dateTime.create();
              var formattedDate = dt.format('Y-m-d H:M:S');  
                console.log(`Request realizado as: ${formattedDate}`);
                res.send(`
                <script>
                   setTimeout(function() { window.location=window.location;},${seconds*1000});
                </script>
                Local: ${results.address}
                Horario: ${formattedDate} | Temperatura: ${weatherResult.temperature}`+
                 `| Humidade ${weatherResult.humidity}%`);
            }
        });
    }
});
 });
app.listen(2000);