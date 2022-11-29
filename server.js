const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { reset } = require('nodemon');
const mongoose = require('mongoose');
const{ Schema } = mongoose;

mongoose.connect('')

//model for 'LoginInfo' table
var userModel = mongoose.model('LoginInfo', new Schema({
   userName: String,
   password: String,
   email: String,
   authenticated: Number,
   authenticateTime: String
}), 'LoginInfo');

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
    //create user object
    //storing the password as plain text is bad for security, but i'm going to do it anyway
    let user = {}
    user.userName = req.body.user;
    user.password = req.body.pass;
    user.email = req.body.email;
    user.authenticated = 0;
    user.authenticateTime = '';
    userModel.find({'userName': req.body.user}, function(err, data){
        if(err) return
        if(data.length===0){
            userModel.create(user)
            res.status(200).redirect("/")
        }
        else{
            res.status(200).send("User already exists");
        }
    })
    console.log(user);
    
})

//finds user by username/email and checks password against what is stored in db, responds with user token, pass this token into other requests to ensure user is logged in
app.post('/login', (req, res) => {
    //console.log(req.body);
    let userName = req.body.user;
    let pw = req.body.pass;
    const now = new Date()
    //do validation here
    //lookup user by userName
    userModel.findOne({'userName':userName},function(err, user){
        if (err) return
        var id = user._id
        if(pw === user.password){
            authenticated = true;
            user.authenticated = 1;
            user.authenticateTime = now
            user.save();
            res.status(200).redirect("/")
            
        }
        else{
            console.log('incorrect password')
            res.status(401).send("Incorrect Password");
        }
    })
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
