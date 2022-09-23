const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");


const app = express();


//database connection
const mongoose = require("mongoose");
const { homedir } = require("os");
mongoose.connect("mongodb://localhost:27017/FacebookCloneDB", {useNewUrlParser: true});


//initialize 
app.set("view engine", "pug");
app.set("views","views");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))



//port listening
app.listen ("3005", function(){
    console.log("listen on port 3005");
})