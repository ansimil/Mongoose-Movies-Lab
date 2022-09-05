const router = require("express").Router();
const Celebrity = require("../models/celebrity")

/* GET home page */
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        //console.log(celebritiesFromDB)
        res.render('celebrities/index', { celebrities: celebritiesFromDB })
    })
    .catch(err => next(err))
});



router.post("/celebrities", (req, res, next) => {
    Celebrity.create(req.body)
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => next(err))
});

router.get("/celebrities/new", (req, res, next) => {
            res.render('celebrities/new')  
    })

    router.get("/celebrities/:id/edit", (req, res, next) => {
        Celebrity.findById(req.params.id)
        .then((celebToEdit) => {
            res.render('celebrities/edit', {celebToEdit: celebToEdit} )
        })
        .catch(err => next(err))
});


    router.post("/celebrities/:id/edit", (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body)
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/celebrities/${req.params.id}`)
    })  
    .catch(err => next(err))
    })

   


router.post("/celebrities/:id/delete", (req, res, next) => {
    console.log(req.params.id)
    Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect('/celebrities')
    })  
    .catch(err => next(err))
})

router.get("/celebrities/:id", (req, res, next) => {
    const CelebID = req.params.id
    Celebrity.findById(CelebID)
    .then(celebrityFromDB => {
        //console.log(celebrityFromDB)
        res.render('celebrities/show', { celebrity: celebrityFromDB })
    })
    .catch(err => next(err))
});



module.exports = router;