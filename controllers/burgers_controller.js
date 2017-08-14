//Node dependencies 
var express = require("express"); 
var router = express.Router(); 
//Import the model (burger.js) to use its database functions
var burgers = require("../models/burger.js"); 

//Create all routes and set up logic within those routes where required
//Redirects to index page
router.get("/", function(req, res) {  
  res.redirect("/burgers");
});

//Renders all burgers to DOM
router.get("/burgers", function(req, res) { 
  burgers.selectAll(function(data){
    var hbsObject = {
      burgers: data
    }; 
    console.log(hbsObject); 
    res.render("index", hbsObject);
  });
}); 

//Creates a new burger 
router.post("/burgers/insertOne", function(req, res) {
  burgers.insertOne(["burger_name"], "req.body.name", function(data) {
    res.redirect("/burgers");
  });
}); 

//Devour burger
router.put("/burger/updateOne/:id", function(req, res) { 
  var condition = "id = " + req.params.id; 

  console.log("condition ", condition); 

  burgers.updateOne({"devoured": req.params.id}, condition, function(data) {
    res.redirect("/burgers");
  });
});

//Export route
module.exports = router; 