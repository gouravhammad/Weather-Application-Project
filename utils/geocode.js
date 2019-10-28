const request = require('request')

const geocode = function(address,callback){
    
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ291cmF2aGFtbWFkIiwi5e64cm4zZG8yZjR3NGQ2MnoifQ.y-1Vc-YorM0gF9xb_Gk2MA&limit=1';

    request({url:url, json:true},function(error,response){
        if(error)
        {
            callback('Unable to connect to Geocode API',undefined)
        }
        else if(response.body.features.length == 0)
        {
            callback('Unable to find location. Try to search another location.',undefined)
        }
        else
        {
            var longitude = response.body.features[0].center[0]
            var latitude = response.body.features[0].center[1]
            var location = response.body.features[0].place_name

            callback(undefined,{
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode;