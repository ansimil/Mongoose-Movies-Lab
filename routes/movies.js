const router = require("express").Router();
const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(movieFromDB => {
        //console.log(movieFromDB)
        res.render('movies/index', { movies: movieFromDB })
    })
    .catch(err => next(err))
});

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        //console.log(celebritiesFromDB)
        res.render('movies/new-movie', { celebrities: celebritiesFromDB })
    })
    .catch(err => next(err))
});

router.post("/movies/create", (req, res, next) => {
    Movie.create(req.body)
    .then(() => {
        res.redirect('/movies')
    })
    .catch(err => next(err))
});

router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => {
        console.log(req.params.id)
        res.redirect('/movies')
    })
    .catch(err => next(err))
});

router.get("/movies/:id/edit", (req, res, next) => {
    let str = ''
    
    Movie.findById(req.params.id)
    .populate({ path: 'cast', model: 'Celebrity'})
    .then((movie) => {
        Celebrity.find()
        .then((celeb) => {
            for (let i = 0; i < celeb.length; i++){
                let sel = false
                for (let j = 0; j < movie.cast.length; j++){
                    
                if (celeb[i].name === movie.cast[j].name){
                    str += `<option value="${celeb[i]._id}" selected>${celeb[i].name}</option>`
                    console.log(celeb[i].name)
                    sel = true
                }
            }
                if (sel === false) {
                str += `<option value="${celeb[i]._id}">${celeb[i].name}</option>`
            }
            }
            
            // for (let k = 0; k < celeb.length; k++) {
            //     str += `<option value="${celeb[k]._id}">${celeb[k].name}</option>`
            // }
            res.render('movies/edit-movies', {movie: movie, str})
        })
        .catch(err => next(err))
        })
        .catch(err => next(err))
});


router.post("/movies/:id/edit", (req, res, next) => {
    console.log(req.body)
    Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/movies/${req.params.id}`)
    })  
    .catch(err => next(err))
    })


router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
    .populate({ path: 'cast', model: 'Celebrity'})
    .then((movieFromDB) => {
        //console.log(movieFromDB)
        res.render('movies/details', { movies: movieFromDB })
    })
    .catch(err => next(err))
});

module.exports = router;