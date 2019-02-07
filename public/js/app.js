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
      id: $(this).data("id")
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
      saved: $(this).data("saved")
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


  // Delete one saved article
  $(".delete-btn").on("click", function (event) {

    var article = {
      id: $(this).data("id")
    }

    $.ajax("/api/article/" + article.id, {
      type: "DELETE",
      data: article
    }).then(
      function () {
        location.reload();
      }
    );

  });

  // Notes Modal Dialog Events
  $('#notesModal').on('show.bs.modal', function (event) {

    console.log(JSON.stringify(event.relatedTarget,0,2));
    const button = $(event.relatedTarget) // Button that triggered the modal
    const id = button.data('id') // Extract info from data-* attributes

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    var modal = $(this)
    modal.find('.modal-title').text('Article Ref #' + id)
    modal.find('.modal-body input').val(id)

  });


});