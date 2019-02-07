$(function () {

  // Grab latest headlines from tech republic 
  $("#scrape-btn").on("click", function (event) {

    $.ajax("/api/scrape", {
      type: "GET",
    }).then(
      function () {
        location.reload();
      }
    );

  });

  // Saves an individual article in the database (update)
  $(".save-btn").on("click", function (event) {
    var article = {
      id : $(this).data("id")
    }

    $.ajax("/api/articles", {
      type: "POST",
      data: article
    }).then(
      function () {
        location.reload();
      }
    );

  });

  // Delete *all* saved articles
  $("#clear-btn").on("click", function (event) {
    var article = {
      saved : $(this).data("saved")
  }

    $.ajax("/api/articles/" + article.saved, {
      type: "DELETE",
      data: article
    }).then(
      function () {
        location.reload();
      }
    );

  });

});
