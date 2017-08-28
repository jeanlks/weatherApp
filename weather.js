const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/9bd765e81143c5ca36076216e27fb23b/${lat},${long}?units=si`,
        json: true
    }, (error, response, body) => {
       if(error) {
           callback('Não foi possivel conectar ao servidor de previsão.');
       } else if(response.statusCode === 400) {
            callback('Não foi possível obter uma previsão.');
       } else if(response.statusCode === 200) {
           callback(undefined, { 
                temperature: body.currently.temperature
            });
       }
    });
}


module.exports.getWeather = getWeather;