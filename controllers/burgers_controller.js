// Dependencies
var express = require("express");
// Import the model to use its db functions for burger.js
var db = require("../models");

// Create the router for the app, and export the router at the end of your file.
var router = express.Router();
// Create routes and set up logic where required.
router.get("/", function (req, res) {
    db.burger.findAll({
    }).then(function(data) {
            var hbsObject = {
                burgers: data
            };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// Add new burger to the db.
router.post("/api/burgers", function (req, res) {
    db.burger.create({
        burger_name: req.body.burger_name,
        devoured: false
    }).then(function(cb) {
        // Send back the ID of the new burger
        // res.json({ id: cb.insertId });
        res.redirect("../models/index");
    });
});
// Set burger devoured status to true.
router.put("/api/burgers/:id", function(req, res) {
    // var condition = "id = " + req.params.id;

    // console.log("condition", condition);

    db.burger.update(req.body.devoured, 
        {
            where: {
                id: req.body.id
            }
        }).then(function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Delete burger from db.
router.delete("/api/burgers/:id", function(req, res) {
    // var condition = "id = " + req.params.id;
    // console.log("condition", condition);

    db.burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;