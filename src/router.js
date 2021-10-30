//creates routes
//express router is the same as the app object in app.js

const express = require("express")

const router = express.Router()

const controller = require("./controllers/controller")

router.get("/", controller.renderHomePage)

//post request
router.post("/", controller.getWeather)

router.get("/about", controller.renderAboutPage)

/*
router.get("/", (req, res) => {
    //renders file that gets passed in as arguement
    res.render("index", {
        title: "Express Weather Finder"
    })
})

router.get("/about", (req,res) => {
    res.render("about")
})

*/

//import router into app.js file
module.exports = router

