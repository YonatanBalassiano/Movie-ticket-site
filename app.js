const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

//database connection
const mongoose = require("mongoose");
const { homedir } = require("os");
mongoose.connect("mongodb://localhost:27017/TicketOrderSite-DB", {useNewUrlParser: true});


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
app.listen ("3006", function(){
    console.log("listen on port 3006");
})

//set routes
const MovieRoute = require("./routes/MovieRoute");
const movieAPI = require("./routes/api/MovieAPIRoute");
const TmdbAPI = require("./routes/api/TmdbAPIRoute");



app.use("/movies",MovieRoute);
app.use("/api/TMDB", TmdbAPI);





app.get("/", (req,res) => {
    res.render("home")
})

app.get("/addmovie", (req,res) => {
    res.render("addmovies")
})