const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const url = "https://api.themoviedb.org/3/movie"
const key = "ad0c39fecd0f5189fce8009604de7bc4"
var request = require('request');
const rp = require('request-promise');


app.use(bodyParser.urlencoded({ extended: false }));


router.get('/:id', async (req, res, next)=> {
    let data = await request(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=ad0c39fecd0f5189fce8009604de7bc4`)
    let text = JSON.parse(data)
    res.status(200).send(text) 
  
  });

  router.get('/:id/videos', async (req, res, next)=> {
    let data = await request(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=ad0c39fecd0f5189fce8009604de7bc4`)
    let text = JSON.parse(data)
    res.status(200).send(text) 
  });

  router.get('/:id/credits', async (req, res, next)=> {
    let data = await request(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=ad0c39fecd0f5189fce8009604de7bc4`)
    let text = JSON.parse(data)
    res.status(200).send(text) 
  });





module.exports = router;