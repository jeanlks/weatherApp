
const request = require('request');
var geocodeAddress = (address, callback) => {
var encodedAddress = encodeURIComponent(address)

request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if(error){
        callback("Algum erro inesperado.");
        console.log();
    }else if (body.status ==='ZERO_RESULTS'){
        callback('Não foi possível encontrar endereço.');
        console.log()
    }else if (body.status === 'OK') {
        callback(undefined, {
            address:body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitute: body.results[0].geometry.location.log
        });
    }

});
};

module.exports.geocodeAddress = geocodeAddress;
