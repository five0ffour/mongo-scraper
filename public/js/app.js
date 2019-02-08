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

  // Notes Modal Dialog Event Pop-up
  $('#notesModal').on('show.bs.modal', function (event) {

    const button = $(event.relatedTarget) 
    const articleId = button.data('id')          // get the data-id for the article primary key

    // Query the database of all existing articles for this key
    $.ajax("/api/notes/" + articleId, {
      type: "GET",
    }).then((data) => {
      const modal = $(this)
      modal.find('.modal-title').text('Article Ref #' + articleId);
      modal.find('.model-content #article-id').data("id", articleId);
    });

  });


  // Save Note Modal button - attach it to the correct article using the _id data attribute
  $(".save-note-btn").on('click', function (event) {
      const id = $("notesModal").find('.model-content #article-id').data("id");
      saveNote();
  });

  function saveNote() {
    // This function handles what happens when a user tries to save a new note for an article
    // Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var noteData;
    var noteText = $("#notesModal #note-text").val().trim();

    // If there is a note post it to "/api/notes" passing in the article id as a foreign key
    if (noteText) {
      const note = {
        body: noteText
      }

      $.ajax("/api/notes", {
        type: "POST",
        data: note
      }).then((result) => {
        console.log(JSON.stringify(result, 0 ,2));
      });
    }
  }


});