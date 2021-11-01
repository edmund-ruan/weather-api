const path = require("path")

const express = require("express")

const app = express()

const router = require("./router")

//basic configurations
app.use(express.urlencoded({ extended: false}))

app.use(express.json())

//middle ware - access to public folder
app.use(express.static("public"))

//look for views in views directory; in MVC deals with the views
app.set("views", "views")

app.set("view engine", "hbs")

//import router.js
app.use("/", router)

//call to local server
app.listen(3002, () => {
    console.log("The server is now running on Port 3002")
})

