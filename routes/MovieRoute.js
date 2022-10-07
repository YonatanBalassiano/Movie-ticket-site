const express = require("express");
const Router = express.Router;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Movie = require("../schemas/MovieSchema");

const app = express();
const router = express.Router();

//initialize 
app.set("view engine", "pug");
app.set("views","views");
app.use(bodyParser.urlencoded({extended: false}));


router.get("/" ,function(req,res){
    Movie.find()
    .then((movies)=>{
        res.status(200).send(movies)
    })
    .catch(err=>console.log(err))
})

router.get("/id/:id" ,function(req,res){
    Movie.findById(req.params.id)
    .then((movie)=>{
        res.status(200).send(movie)
    })
    .catch(err=>console.log(err))
})

router.get("/:name",function(req,res){
    let name = req.params.name
    name = name.replaceAll('-', ' ');
    Movie.findOne({name:name})
    .then((movie)=>{
        let seats =[]
        movie.seats.forEach((seat)=>{
            seats.push(seat.number)
        })
        res.render("moviePage",{movie:movie,seats:seats})
    })
    .catch(err=>console.log(err))
    
})

router.post("/:name", async function (req,res){
    let name = req.params.name
    let userName = req.body.firstName +" "+ req.body.lastName;
    name = name.replaceAll('-', ' ');

    let seats = req.body.seats
    seats = seats.split(",")

    Movie.findOneAndUpdate({name:name},{$push :{seats:{number:seats,person:userName} }})
    .then((movie)=>{
        return res.status(201).redirect("/")
    })
    .catch(err=>console.log(err))
})

router.post("/", (req, res) =>{
    let movieName = req.body.movieName
    let movieTime = req.body.movieTime
    let movieAbout = req.body.movieAbout
    let movieImage = req.body.movieImage
    let payload = req.body;

    if (movieAbout && movieImage && movieName && movieTime){
        Movie.create({
            name: movieName,
            about:movieAbout,
            time:movieTime,
            cover:movieImage
        })
        .then((movie)=>{
            return res.status(201).redirect("/")
        })
        .catch((err)=> console.log(err))
        
    }
    else{
        payload.errorMessage = "please fill all options"
        res.status(200).render("addMovies", payload);
    }

})




module.exports = router;