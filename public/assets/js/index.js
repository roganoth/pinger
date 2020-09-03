// import { json } from "express";

$(document).ready(function () {
  // const TBR = [];
  function populateResults(data) {
    let movies = data.movies;
    let len = data.movies.length;
    console.log(movies);

    let movies_elem = $("#list");
    let movies_elem2 = $("#viewedList");
    for (i = 0; i < len; i++) {
      let upvote = $("<button>");
      upvote.addClass("btn btn-info btn-sm");
      upvote.addClass("glyphicon glyphicon-triangle-top");
      upvote.attr("data-id", movies[i].id);
      upvote.attr("data-title", movies[i].title);
      upvote.attr("id", "upvote");
      upvote.html("Upvote");

      let downvote = $("<button>");
      downvote.addClass("btn btn-info btn-sm");
      downvote.addClass("glyphicon glyphicon-triangle-bottom");
      downvote.attr("data-id", movies[i].id);
      downvote.attr("data-title", movies[i].title);
      downvote.attr("id", "downvote");
      downvote.html("Downvote");

      let del = $("<button>");
      del.addClass("btn btn-info btn-sm");
      del.addClass("glyphicon glyphicon-trash");
      del.attr("data-id", movies[i].id);
      del.attr("data-title", movies[i].title);
      del.attr("id", "delete");
      del.html("Delete");

      let nameString = $(`<li> ${movies[i].title} </li>`);

      nameString.append(upvote);
      nameString.append(downvote);
      nameString.append(del);
      if (
        movies[i].would_watch_again == 0 ||
        movies[i].would_watch_again == 1
      ) {
        movies_elem2.append(nameString);
      } else {
        // TBR.push(movies[i].title);
        movies_elem.append(nameString);
      }
    }
  }

  //loads movie list
  $.ajax("/movies", {
    type: "GET",
  }).then(function (data) {
    populateResults(data);
  });

  //loads list random by default
  // $.ajax("/moviesRandom", {
  //   type: "GET",
  // }).then(function (data) {
  //   populateResults(data);
  // });

  $.fn.shufflelistitems = function () {
    $.each(this.get(), function (index, el) {
      var $el = $(el);
      var $find = $el.children();

      $find.sort(function () {
        return 0.5 - Math.random();
      });

      $el.empty();
      $find.appendTo($el);
    });
  };
  //randomizing the list
  $("#random").click(function (event) {
    event.preventDefault();
    $("#list").shufflelistitems();
  });

  //adding to the list
  $("#insert").click(function (event) {
    event.preventDefault();
    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    let newMovie = {
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
    let id = $(this).attr("data-id");
    let title = $(this).attr("data-title");
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

  //upvote action
  $(document).on("click", "#upvote", function (event) {
    event.preventDefault();
    let updateMovie = {
      title: $(this).attr("data-title"),
      would_watch_again: true,
    };
    let id = $(this).attr("data-id");
    $.ajax("/movies/" + id, {
      type: "PUT",
      data: JSON.stringify(updateMovie),
      dataType: "json",
      contentType: "application/json",
    }).then(function (data) {
      location.reload();
    });
  });

  //downvote action
  $(document).on("click", "#downvote", function (event) {
    event.preventDefault();
    let id = $(this).attr("data-id");
    let would_watch_again = $(this).attr("watch-again");
    let updateMovie = {
      title: $(this).attr("data-title"),
      would_watch_again: false,
    };
    $.ajax("/movies/" + id, {
      type: "PUT",
      data: JSON.stringify(updateMovie),
      dataType: "json",
      contentType: "application/json",
    }).then(function (data) {
      location.reload();
    });
  });
});
