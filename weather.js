const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${long}?units=si`,
        json: true
    }, (error, response, body) => {
       if(error) {
           callback('Não foi possivel conectar ao servidor de previsão.');
       } else if(response.statusCode === 400) {
            callback('Não foi possível obter uma previsão.');
       } else if(response.statusCode === 200) {
           callback(undefined, { 
                temperature: body.currently.temperature,
                humidity: Math.floor(body.currently.humidity*100)
            });
       }
    });
}


module.exports.getWeather = getWeather;