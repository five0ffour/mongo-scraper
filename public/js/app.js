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

  // Delete *all* saved articles
  $("#clear-btn").on("click", function (event) {

    $.ajax("/api/articles", {
      type: "DELETE",
    }).then(
      function () {
        location.reload();
      }
    );

  });

});