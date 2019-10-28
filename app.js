const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 8080

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Inbuild Middleware
app.use(express.static(path.join(__dirname,'public')))

// View Engine Setup
app.set('views',path.join(__dirname,'templates/views'))
app.set('view engine','hbs')

app.get('',function(req,res){
    res.render('weather',{
        Msg: "Just type the location and find it's forecast"
    })
})

app.get('/about',function(req,res){
    res.render('about',{})
})

app.get('/help',function(req,res){
    res.render('help',{
        helpText: 'Feel free to mail us at gouravhammad477@gmail.com'
    })
})

app.get('/weather',function(req,res){
    search = req.query.address

    if(!search)
    {
        return res.send({error: 'You must provide an Address'})
    }

    geocode(search,function(error,data){
        if(error)
        {
           return res.send({error: error})
        }
    
        forecast(data.latitude,data.longitude,function(error,forecastData){
            if(error)
            {
                return res.send({error:error})
            }
            else
            {
                res.send({
                    location: data.location,
                    forecast: forecastData
                })
            }
        })
    })
})

app.get('*',function(req,res){
    res.render('404',{
        errorMsg: '404' 
    })
})

app.listen(port,function(error){
    if(error) throw error
    console.log("Server created Successfully")
})