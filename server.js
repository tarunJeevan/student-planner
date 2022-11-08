const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https');
const { reset } = require('nodemon');

let app = express()

app.use(express.static(path.join(__dirname, "\\public")))
app.use(bodyParser.text())

app.get('/', (req, res) => {

    if (//not authenticated
        false) {
        res.status(200).sendFile(path.join(__dirname, "/pages/login.html"))
    } //authenticated
    else {
        res.status(200).sendFile(path.join(__dirname, "/pages/homepage.html"))
    }
})

app.get('/calendar', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "\\public\\calendar.html"))
})

app.listen(8080)