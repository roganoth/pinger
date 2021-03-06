require("dotenv").config();
let express = require("express");
let movies = require("../models/movies.js");
let router = express.Router();
let path = require("path");

router.get("/", function (req, res) {
  res.sendFile("./public/index.html");
});

router.get("/movies", function (req, res) {
  movies.selectAll(function (data) {
    res.json({ movies: data });
  });
});

router.get("/moviesRandom", function (req, res) {
  movies.selectAllRandom(function (data) {
    res.json({ movies: data });
  });
});

router.post("/movies", function (req, res) {
  movies.insertOne(
    ["title", "synopsis", "rating", "would_watch_again"],
    [
      req.body.title,
      req.body.synopsis,
      req.body.rating,
      req.body.would_watch_again,
    ],
    function (result) {
      console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

router.put("/movies/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  movies.updateOne(
    {
      title: req.body.title,
      would_watch_again: req.body.would_watch_again,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.json({ id: req.params.id });
      }
    }
  );
});

router.delete("/movies/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  movies.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
      console.log("Movie " + condition + " was deleted.");
    }
  });
});

router.get("/movies/:column/:colVal", function (req, res) {
  let cols = req.params.column;
  let colVal = req.params.colVal;

  console.log(cols);
  console.log(colVal);
  movies.findAllWhere(cols, colVal, function (data) {
    console.log(data);
    res.json({ movies: data });
  });
});

module.exports = router;
