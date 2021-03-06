var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  /********************/
  /* News Source APIs */
  /********************/

  // Scrape news source and push to database
  app.get("/api/scrape", function (req, res) {

    axios.get("http://www.techrepublic.com/").then(function (response) {

      var $ = cheerio.load(response.data);

      // Grab every list item within a media-list class
      $(".media-list li").each(function (i, element) {

        const result = {};
        const article = $(element)
          .children(".item-content");


        result.title = article.children("h3").children("a").text();
        result.link = article.children("h3").children("a").attr("href");
        result.summary = article.children("p").text();
        result.saved = false;

        // Save these records in Mongo defaulted to "not saved" (paradoxically)
        db.Article.create(result)
          .then(function (dbArticle) {})
          .catch(function (err) {
            console.log(err);
          });

      });

      res.send("Scraped TechRepublic.com");
    });
  });

  // Delete many - saved = true for archived,  saved = false for just the scraped ones
  app.delete("/api/articles/:saved", function (req, res) {

    const isSaved = req.params.saved;

    console.log("Deleting articles from database");
    db.Article.deleteMany({
        saved: isSaved
      })
      .then(function () {
        console.log("successfully deleted records from database");
      })
      .catch(function (err) {
        console.log(err);
      });

    res.sendStatus(200).end();
  });

  /***********************/
  /* Saved Articles APIs */
  /***********************/

  // Get all saved articles
  app.get("/api/articles", function (req, res) {
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

  // Saves the article to the database (logically, the data is already there)
  app.post("/api/articles", function (req, res) {

    const id = req.body.id;

    db.Article.update({
        "_id": id
      }, {
        "saved": "true"
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Delete saved article by id
  app.delete("/api/article/:id", function (req, res) {
    const id = req.params.id;

    console.log("Deleting one article from database");
    db.Article.deleteOne({
        _id: id
      })
      .then(function () {
        console.log("successfully deleted document from database");
      })
      .catch(function (err) {
        console.log(err);
      });
    res.sendStatus(200).end();
  });


  /*************/
  /* Note APIs */
  /*************/

  // Get saved article details by id
  app.get("/api/articles/:id", function (req, res) {
    res.json(res);
  });

  // Get saved notes by article id
  app.get("/api/notes/:articleid", function (req, res) {
    res.status(200).end();
  });

  // Save a note linking it to an article
  app.post("/api/notes", function(req, res) {
    const note = req.body.note;

    db.Note.create(note)
    .then(function (dbNote) {
      res.json(dbNote);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).end();
    });

  });

  // Delete saved note by note id
  app.delete("/api/notes/:id", function (req, res) {
    res.json(res);
  });


  /*************/
  /* Catch All */
  /*************/

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};