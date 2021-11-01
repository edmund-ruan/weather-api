//controller (C in MVC) deals with logic and interacts with views
//we have controller files to not fill router.js with all the 
//logic and create confusion

//var config = require("./config.json");

//var config = require("./config.json");

require('dotenv').config();
const axios = require("axios")
const { response } = require("express")
const API_KEY = process.env.WEATHER_API_KEY
const Weather = require("../model/Weather")


xports.renderLoginPage = (req, res) => {
    res.render("login")
}

//below are callback files to router
exports.renderHomePage = (req, res) => {
    res.render("index")
}

exports.getWeather = (req, res) => {
    //saves user input
    //console.log(req)
    //res.send(`You typed ${req.body.city}.`)
    const zip_code = req.body.zip_code
    const days = req.body.days
    //const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip_code}&cnt=${days}&appid=${API_KEY}&units=imperial`

    const weather = new Weather(req.body.city)
    weather.validateUserInput()

    const eve = new Weather(req.body.city)
    eve.validateUserInput()

    if (weather.errors.length) {
        res.render("index", {
            error: weather.errors.toString()
        })
    } /*else {
    //stores information from API call as object
     axios.get(url).then((response) => {
        //extract __
        var tempList = response.data.list
        for (var key in tempList) {
            if (tempList.hasOwnProperty(key)) {
                console.log(tempList[key].temp)
                res.render("index", {
                    weather: `1) ${tempList[key].temp.day} in the day and ${tempList[key].temp.eve} in the evening.`
                })
            }
        }}).catch((error) => {
        console.log(error)
        }) 
    } */

    else {
    //stores information from API call as object
    axios.get(url).then((response) => {
        //extract __
        var tempList = response.data.list
        var dayList = []
        var eveList = []
        for (var key in tempList) {
            if (tempList.hasOwnProperty(key)) {
                //console.log(tempList[key].temp.day)
                dayList.push(tempList[key].temp.day)
                eveList.push(tempList[key].temp.eve)
                //res.render("index", {
                    //weather: `a) ${tempList[key].temp.day} in the day and ${tempList[key].temp.eve} in the evening.`
                    //sentence: 'hi'
                //})
            }
        }
        console.log(tempList)
        //dayList = dayList.toString()
        var dayListAsString = ""
        for (let i = 0;i<dayList.length;i++) {
            dayListAsString += i.toString() + ") " + dayList[i].toString() + "°F "
        }
        var eveListAsString = ""
        for (let i = 0;i<eveList.length;i++) {
            eveListAsString += i.toString() + ") " + eveList[i].toString() + "°F "
        }
        res.render("index", {
            weather: dayListAsString,
            eve: eveListAsString,
            zip_code: zip_code,
            days: days
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