const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const url = "https://api.themoviedb.org/3/movie"
const key = "ad0c39fecd0f5189fce8009604de7bc4"
var request = require('request');
const rp = require('request-promise');


app.use(bodyParser.urlencoded({ extended: false }));

  router.get('/:id', (req, res, next)=> {
    request(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=ad0c39fecd0f5189fce8009604de7bc4`,function (error, response, body) {
        if (!error && response && response.statusCode == 200) {
            let text = JSON.parse(body)
          res.status(200).send(text) 
        }
    })
  });

  router.get('/:id/videos', (req, res, next)=> {
    request(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=ad0c39fecd0f5189fce8009604de7bc4`,function (error, response, body) {
        if (!error && response && response.statusCode == 200) {
            let text = JSON.parse(body)
          res.status(200).send(text) 
        }
    })
  });

  router.get('/:id/credits', (req, res, next)=> {
    request(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=ad0c39fecd0f5189fce8009604de7bc4`,function (error, response, body) {
        if (!error && response &&  response.statusCode == 200) {
            let text = JSON.parse(body)
          res.status(200).send(text) 
        }
    })
  });




module.exports = router;