const request = require('request')

const forecast = function(latitude,longitude,callback){
    
    var url = 'https://api.darksky.net/forecast/04sxgshrshbsrg247b5ba9f2254b5174/'+latitude+','+longitude + '?units=si&exclude=minutely,hourly,flags,alerts';

    request({url:url, json:true},function(error,response){
        if(error)
        {
            callback('Unable to connect to Forecast API',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location. Try to search another location.',undefined)
        }
        else
        {
            msg = response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature +  ' degrees out. The high today is ' + response.body.daily.data[0].temperatureHigh + ' with a low of ' + response.body.daily.data[0].temperatureLow + '. There is a ' + response.body.currently.precipProbability + '% chance of rain.'
            callback(undefined,msg)
        }
    })
}

module.exports = forecast;