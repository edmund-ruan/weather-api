//controller (C in MVC) deals with logic and interacts with views
//we have controller files to not fill router.js with all the 
//logic and create confusion

require('dotenv').config();
const axios = require("axios")
const { response } = require("express")
const API_KEY = process.env.WEATHER_API_KEY
const Weather = require("../model/Weather")

//below are callback files to router
exports.renderHomePage = (req, res) => {
    res.render("index")
}

exports.getWeather = (req, res) => {
    //saves user input
    //console.log(req)
    //res.send(`You typed ${req.body.city}.`)
    const city = req.body.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`

    const weather = new Weather(req.body.city)
    weather.validateUserInput()

    if (weather.errors.length) {
        res.render("index", {
            error: weather.errors.toString()
        })
    } else {
    //stores information from API call as object
    axios.get(url).then((response) => {
        //extract __
        const { temp: temperature } = response.data.main
        const { name: location } = response.data
        //console.log()
        res.render("index", {
            weather: `It is currently ${temperature} in ${location}`
            //weather: `It is currently ${response.data.main.temp} in ${response.data.name}`
        })
    }).catch((error) => {
        console.log(error)
        })
    }
    
}

exports.renderAboutPage = (req, res) => {
    res.render("about")
}

//model in MVC sets the rules