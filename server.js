const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { reset } = require('nodemon');
const mongoose = require('mongoose');
const{ Schema } = mongoose;


const userSchema = new Schema({
    userName: String,
    email: String,
    password: String
})

let app = express()

app.use(express.static(path.join(__dirname, "./")))
app.use(bodyParser.urlencoded({ extended: false }))
//this won't work for multiple users, once one user is authenticated it will read true for all users
let authenticated = true;

app.get('/', (req, res) => {

    if (authenticated) {
        res.status(200).sendFile(path.join(__dirname, "/pages/dashboard.html"))
    }
    else {
        res.status(200).sendFile(path.join(__dirname, "/pages/login.html"))
    }
})

//create user in database from request data
app.post('/signUp', (req, res) => {
    //randomly generate an 8 digit login token
    let token = []
    for(let i=0;i<8;i++){
        token.push(Math.floor(Math.random()*10))
    }
    token = token.join('');
    //create user object
    //storing the password as plain text is bad for security, but i'm going to do it anyway
    let user = {}
    user.userName = req.body.user;
    user.pass = req.body.pass;
    user.email = req.body.email;
    user.token = '';
    console.log(user);
    
})

//finds user by username/email and checks password against what is stored in db, responds with user token, pass this token into other requests to ensure user is logged in
app.post('/login', (req, res) => {
    console.log(req.body);
    let userName = req.body.user;
    let pw = req.body.pass;
    //do validation here
    //lookup user by userName

    //compare password given to password in database

    //if they match, return user id and redirect to home page

    //else return null
})

app.get('/calendar', (req, res) => {

    if (authenticated) {
        res.status(200).sendFile(path.join(__dirname, "/pages/calendar.html"))
    } else {
        res.status(200).redirect("/")
    }
})

app.get('/notes', (req, res) => {
    if (authenticated) {
        res.status(200).sendFile(path.join(__dirname, "/pages/notebook.html"))
    } else {
        res.status(200).redirect("/")
    }
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