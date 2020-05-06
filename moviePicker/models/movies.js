const orm = require("../config/orm.js");
const path = require("path");

const movies = {
  selectAll: function (cb) {
    orm.selectAll("movies", cols, vals, function (res) {
      cb(res);
    });
  },
  selectAllRandom: function (cb) {
    orm.selectAll("movies", cols, vals, function (res) {
      cb(res);
  },
  insertOne: function (cols, vals, cb) {
    orm.insertOne("movies", cols, vals, function (res) {
      cb(res);
    });
  },
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne("movies", objColVals, condition, function (res) {
      cb(res);
    });
  },
  delete: function (condition, cb) {
    orm.delete("movies", condition, function (res) {
      cb(res);
    });
  },
  findAllWhere: function (cols, colVal, cb) {
    orm.findAllWhere("movies", cols, colVal, function (res) {
      cb(res);
    });
  },
};

module.exports = movies;
