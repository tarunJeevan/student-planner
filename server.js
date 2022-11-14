const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https');
const { reset } = require('nodemon');

let app = express()

app.use(express.static(path.join(__dirname, "./")))
app.use(bodyParser.text())
let authenticated = true;

app.get('/', (req, res) => {

    if (//not authenticated
        !authenticated) {
        res.status(200).sendFile(path.join(__dirname, "/pages/login.html"))
    } //authenticated
    else {
        res.status(200).sendFile(path.join(__dirname, "/pages/dashboard.html"))
    }
})

app.get('/calendar', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/pages/calendar.html"))
})

app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/pages/notebook.html"))
})

app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/pages/signup.html"))
})

app.get('/signout', (req, res) => {
    //unauthenticate
    authenticated = false
    res.status(200).redirect("/")
})

app.post('/', (req, res) => {

})

app.listen(8080)