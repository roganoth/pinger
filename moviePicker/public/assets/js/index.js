$(document).ready(function () {
  function populateResults(data) {
    const movies = data.movies;
    const len = data.movies.length;

    const movies_elem = $("#list");
    for (i = 0; i < len; i++) {
      const upvote = $("<button>");
      upvote.addClass("btn btn-sm");
      upvote.addClass("glyphicon glyphicon-triangle-top");
      upvote.attr("data-id", movies[i].id);
      upvote.attr("id", "upvote");

      const downvote = $("<button>");
      downvote.addClass("btn btn-sm");
      downvote.addClass("glyphicon glyphicon-triangle-bottom");
      downvote.attr("data-id", movies[i].id);
      downvote.attr("id", "downvote");

      const del = $("<button>");
      del.addClass("btn btn-sm");
      del.addClass("glyphicon glyphicon-trash");
      del.attr("data-id", movies[i].id);
      del.attr("data-title", movies[i].title);
      del.attr("id", "delete");

      const nameString = $(`<li> ${movies[i].title} </li>`);

      nameString.append(upvote);
      nameString.append(downvote);
      nameString.append(del);
      movies_elem.append(nameString);
    }
  }

  //loads list random by default
  $.ajax("/moviesRandom", {
    type: "GET",
  }).then(function (data) {
    populateResults(data);
  });

  //   //randomizing the list
  //   $("#random").click(function (event) {
  //     event.preventDefault();
  //     const list = $("#list");
  //     const tracker = [];
  //     for (i = 0; i < list.length; i++) {
  //       let randomNumber = Math.random(Math.floor() * 100) + 1;
  //       if (!tracker.includes(randomNumber){
  //           tracker.push(randomNumber);
  //           $.ajax("/")
  //       })
  //     }
  //   });

  //adding to the list
  $("#insert").click(function (event) {
    event.preventDefault();
    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    const newMovie = {
      title: $("#title").val().trim(),
      random_value: randomNumber,
    };
    $.ajax("/movies", {
      type: "POST",
      data: JSON.stringify(newMovie),
      dataType: "json",
      contentType: "application/json",
    }).then(function (data) {
      console.log("Movie Added");
      location.reload();
    });
  });

  //delete action
  $(document).on("click", "#delete", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-id");
    var title = $(this).attr("data-title");
    $("#delWarning").modal("toggle");
    $("#warningBody").empty();
    $("#warningBody").append(
      "You will be permanently deleting the movie: " + title
    );
    $("#delConfirm").click(function () {
      $.ajax("/movies/" + id, {
        type: "DELETE",
      }).then(function (data) {
        location.reload();
      });
    });
  });
});
