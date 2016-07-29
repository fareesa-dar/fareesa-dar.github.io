
jQuery("#contributors") // j Query is a function from a libary like random.random in python it takes one argument
.on // event handler for the code
("click" , // states what events are considered
function(){ // this happens when click is triggered
  var message = "Game created by Fareesa and Lamis!"; // display this message
  jQuery("#contributors").append(
        "<p>" + message + "</p>"
      ); // pop up message
}); // close brackets

jQuery("#scores").on("click", function() {
  jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li>" + "Me" + "</li>" +
            "<li>" + "Also me" + "</li>" +
            "<li>" + "Me again" + "</li>" +
        "</ul>"
    );
});

jQuery("#credits").on("click", function() {
    jQuery("#content").empty(); //this allows each button content to disappear when a new button is clicked
    jQuery("#content").append(
        "<div>" + "Game created by Fareesa and Lamis!" + "</div>"
    );
});

jQuery("#help").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" + "<li>" + "Press SPACE to flap your wings" + "</li>"+
        "<li>" + "Avoid the incoming pipes" + "</li>"+
        "<li>" + "If you crash, try again!" + "</li>" + "</ul>"
    );
});

var lst = [];

function registerScore(score){
  var playername = prompt("What's your name?");
  var scoreentry = "<li>" + playerName + ":" + score.toString() + "</li>";
}


jQuery("#scoreboard").on("click", function(){
    jQuery("#content").empty();
    jQuery("#content").append(registerScore);


  });
