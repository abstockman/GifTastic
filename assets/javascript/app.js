// INTIAL ARRAY OF SPORTS

var sports =["Basketball", "Football", "Golf", "Softball", "Racquetball", "Hockey"];

// FUNCTION FOR DISPLAYING SPORTS ARRAY CONTENTS AS BUTTONS IN THE #BUTTONS-VIEW DIV

function renderButtons() {
  $('#buttons-view').empty();
  for (var i = 0; i < sports.length; i++) {
    $('#buttons-view').append('<button id="find-gifs" type="submit" data-name="' +sports[i] + '">' + sports[i] + '</button>');
  }
};

// THIS FUNTION HANDLES EVENTS WHERE THE "add-sport" BUTTON IS CLICKED AND PUSHES THE INPUT DATA INTO THE SPORTS ARRAY AND CALLS THE renderButtons FUNCTION

$("#add-sport").on("click", function() {
  event.preventDefault();
  var userSport = $("#sport-input").val().trim();
  if ($('#sport-input').val().length != 0) {
    sports.push(userSport);
    renderButtons();
    console.log(sports);
    // clears the sport-input value
    $("#sport-input").val("");
  }
});

// NEEDS TO BE DOCUMENT.ON CLICK BECAUSE IT WILL NOT WORK SINCE IT IS GENERATED WITH JQUERY

$(document).on("click", "#find-gifs", function(event) {
  // PREVENTS DEFAULT BUTTON ACTION OF REFRESHING THE PAGE
  event. preventDefault();
  $('#sport-gifs').html('');
  var sportName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportName + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({url: queryURL, method: 'GET',})
  .done(function(response) {
    console.log(response);
    renderButtons();
    for (var i = 0; i < response.data.length; i++) {
      $("#sport-gifs").append("<img class='single-gif' src='" + response.data[i].images.fixed_width_still.url + "'>");
      $('#sport-gifs').append("<p class='gif-rating'>" + response.data[i].rating + "</p>");
    }
  })
});

// $("document").ready(function(){
//         $(".single-gif").hover(function(){
//             $(this).attr.replace("w_s.gif", "w.gif");
//         });
//         $(".single-gif").mouseleave(function(){
//             $(this).attr.replace("w.gif", "w_s.gif");
//         });
//     });



// CALLING THE renderButtons FUNCTION TO DISPLAY THE INTIAL SPORTS LIST

renderButtons();
