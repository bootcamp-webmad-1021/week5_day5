const Park = require("../models/Park.model");

const router = require("express").Router();

// Endpoints
router.get("/new", (req, res) => {
  res.render("parks/new-park")
})

router.post("/new", (req, res) => {
  const { name, description } = req.body
  console.log("los datos del body ", name, description)

  Park.create({ name, description })
    .then(newPark => {
      console.log("Se creo!: ", newPark)
      res.redirect("/")
    })
    .catch(err => console.log(err))


})

module.exports = router;