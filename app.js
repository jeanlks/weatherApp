const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode')
const weather = require('./weather');
var dateTime = require('node-datetime');

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

geocode.geocodeAddress(argv.address, (errorMessage, results ) => {
   if(errorMessage) {
       console.log(errorMessage);
   } else {
       console.log(results.address);
     
        setInterval(() => {
             weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResult) => {
            if(errorMessage){
                console.log(errorMessage);
            }else {
              var dt = dateTime.create();
              var formattedDate = dt.format('Y-m-d H:M:S');       
                console.log(`Horario: ${formattedDate} | Temperatura: ${weatherResult.temperature}`)
            }
        });
        }, seconds*1000);
    }
});
