var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  /********************/
  /* News Source APIs */
  /********************/

  // Scrape news source
  app.get("/api/scrape", function (req, res) {

    axios.get("http://www.techrepublic.com/").then(function (response) {

      var $ = cheerio.load(response.data);

      // Grab every list item within a media-list class
      $(".media-list li").each(function (i, element) {

        const result = {};
        const article = $(element)
          .children(".item-content")
          .children("h3")
          .children("a");

        result.title = article.text();
        result.link = article.attr("href");

        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });

      });

      res.send("Scraped TechRepublic.com");
    });
  });

  // Delete all scraped articles
  app.delete("/api/reset", function (req, res) {
    res.json(res);
  });


  /***********************/
  /* Saved Articles APIs */
  /***********************/

  // Get all saved articles
  app.get("/api/article", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Save new article
  app.post("/api/article", function (req, res) {
    res.json(res);
  });

  // Update saved article by id
  app.put("/api/article/:id", function (req, res) {
    res.json(res);
  });

  // Delete saved article by id
  app.delete("/api/article/:id", function (req, res) {
    res.json(res);
  });


  /*************/
  /* Note APIs */
  /*************/

  // Get saved article details by id
  app.get("/api/article/:id", function (req, res) {
    res.json(res);
  });

  // Get saved notes by article id
  app.get("/api/notes/:articleid", function (req, res) {
    res.json(res);
  });

  // Delete saved note by note id
  app.delete("/api/notes/:id", function (req, res) {
    res.json(res);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};