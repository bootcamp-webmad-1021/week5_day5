const router = require("express").Router();
const Park = require("../models/Park.model")
const Coaster = require("../models/Coaster.model")
// Endpoints
router.get("/new", (req, res) => {

  Park.find()
    .then(allParks => {
      console.log(allParks)
      res.render("coasters/new-coaster", { allParks })
    })
    .catch(err => console.log(err))

})


router.post("/new", (req, res) => {
  const { name, description, inversions, length, park_id } = req.body
  console.log("los datos del body ", req.body)

  Coaster.create({ name, description, inversions, length, park_id })
    .then(newCoaster => {
      console.log("Se creo!: ", newCoaster)
      res.redirect("/")
    })
    .catch(err => console.log(err))

})

router.get("/", (req, res) => {
  //TYPO: coaster-index

  Coaster.find()
    .populate("park_id")
    .then(allCoasters => res.render("coasters/coaster-index", { allCoasters }))
    .catch(err => console.log(err))

})

router.get("/delete", (req, res) => {
  const { id } = req.query


  Coaster.findByIdAndDelete(id)
    .then(info => {
      console.log(info)
      res.redirect("/coasters")
    })
    .catch(err => console.log(err))

})

router.get("/edit", (req, res) => {
  const { id } = req.query

  Coaster.findById(id)
    .then(coaster => {
      Park.find()
        .then(allParks => res.render("coasters/edit-coaster", { coaster, allParks }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

/////////// CON PROMISE ALL
// router.get("/edit", (req, res) => {
//   const { id } = req.query

//   //Promise ALL recibe un array de promesas
//   const promiseArr = [Coaster.findById(id), Park.find()]

//   Promise.all(promiseArr)
//     //la respuesta es el resultado de cada promesa en el mismo orden que entraron
//     .then(response => {
//       const coaster = response[0]
//       const allParks = response[1]
//       res.render("coasters/edit-coaster", { coaster, allParks })
//     })
//     .catch(err => console.log(err))

// })



router.post("/edit", (req, res) => {
  const { id } = req.query
  const { name, description, inversions, length, park_id } = req.body

  Coaster.findByIdAndUpdate(id, { name, description, inversions, length, park_id }, { new: true })
    .then(updatedCoaster => {
      res.redirect("/")
    })
    .catch(err => console.log(err))


})

router.get("/:id", (req, res) => {
  const { id } = req.params

  Coaster.findById(id)
    .populate("park_id")
    .then(coaster => res.render("coasters/coaster-details", coaster))
    .catch(err => console.log(err))
})



module.exports = router;