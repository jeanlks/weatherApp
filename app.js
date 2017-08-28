const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode')
const weather = require('./weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.address, (errorMessage, results ) => {
   if(errorMessage) {
       console.log(errorMessage);
   } else {
       console.log(results);
       weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResult) => {
            if(errorMessage){
                console.log(errorMessage);
            }else {
                console.log(`Temperatura: ${weatherResult.temperature}`)
            }
       });
    }
});
