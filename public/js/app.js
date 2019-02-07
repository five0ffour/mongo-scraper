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

    const button = $(event.relatedTarget) // Button that triggered the modal
    const id = button.data('id') // Extract info from data-* attributes

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    var modal = $(this)
    modal.find('.modal-title').text('Article Ref #' + id)
    modal.find('.modal-body input').val(id)
    modal.data("id",id);
  });


  // Save Note Modal button
  $(".save-note-btn").on('click', function (event) {
      const id = $("notesModal").data("id");
      console.log("id: ", id);
      console.log(JSON.stringify(event,0,2));
      handleNoteSave();
  });

  function handleNoteSave() {
    // This function handles what happens when a user tries to save a new note for an article
    // Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var noteData;
    var newNote = $("#notesModal textarea")
      .val()
      .trim();
    // If we actually have data typed into the note input field, format it
    // and post it to the "/api/notes" route and send the formatted noteData as well
    if (newNote) {
      alert("Saved.." + newNote);
      // noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
      // $.post("/api/notes", noteData).then(function() {
      //   // When complete, close the modal
      //   bootbox.hideAll();
      // });
    }
  }


});