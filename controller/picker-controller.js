require("dotenv").config();
const express = require("express");
const movies = require("../models/movies.js");
const router = express.Router();
const path = require("path");

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
    ["title", "synoppsis", "rating", "would_watch_again"],
    [
      req.body.title,
      req.body.synoppsis,
      req.body.rating,
      req.body.wouldWatchAgain,
    ],
    function (result) {
      console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

router.put("/movies/:id", function (req, res) {
  const condition = "id = " + req.params.id;

  movies.updateOne(
    {
      title: req.body.title,
      synoppsis: req.body.synoppsis,
      rating: req.body.rating,
      would_watch_again: req.body.wouldWatchAgain,
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
  const condition = "id = " + req.params.id;

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
  const cols = req.params.column;
  const colVal = req.params.colVal;

  console.log(cols);
  console.log(colVal);
  movies.findAllWhere(cols, colVal, function (data) {
    console.log(data);
    res.json({ movies: data });
  });
});

module.exports = router;
