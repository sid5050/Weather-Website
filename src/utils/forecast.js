const request = require('request')

const forecast = (lon,lat,callback) => {
    
    // console.log(lat,lon)
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=71e16f3affc7c091a6a72ae0f828f8c2&units=metric'
    // console.log(url)

    request({url: url,json: true},(error,response) => {
        if(error){
            console.log(error)
                callback('Unable to connect to weather service!',undefined)
        } else if(response.body.cod == 400){
                callback('Unable to find location',undefined)
            } else{
                    callback(undefined,{
                        body: response.body.main,
                        weather: response.body.weather           
                    })
            }
    })
}

module.exports = forecast