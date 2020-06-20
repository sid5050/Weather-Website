const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Siddhant'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        aboutText: 'This site was created by Siddhant Gupta. It uses geo location data from MapBox to retrieve weather information from OpenWeatherMap.',
        name: 'Siddhant'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Click the weather tab and enter your desired location to find its weather status!!',
        name: 'Siddhant'
    })
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }

    const input = req.query.address

    geocode(input,(error,data)=>{
        if(error){
            return res.send({
                errorMessage: error
            })
        }
    
        forecast(data.longitude,data.latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    errorMessage: error
                })
            }
            
            res.send({
                location: data.location,
                forecast: forecastData.weather[0].description,
                temperature: forecastData.body.temp,
                address: req.query.address
            })
            console.log('Weather desription: '+ forecastData.weather[0].description +'. It is currently '+forecastData.body.temp+' degrees out.')
            console.log(data.location)
          })
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not Found.',
        name: 'Siddhant'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        errorMessage: 'Page not Found.',
        name: 'Siddhant'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})