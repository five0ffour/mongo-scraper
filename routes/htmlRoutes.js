var db = require("../models");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    console.log("Getting scraped articles");

    db.Article.find({})
      .then(function (data) {
        var articleData = {
          articles: data
        };

        res.render("index", articleData);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/saved", function (req, res) {
    console.log("Getting saved articles");

    db.Article.find({})
      .then(function (data) {
        var articleData = {
          articles: data
        };

        res.render("saved", articleData);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

};