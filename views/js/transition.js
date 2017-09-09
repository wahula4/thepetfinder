var currentColor = 0;
var colors = ["images/bird.jpg", "images/lassie.jpg",  "images/kitten.jpg", "images/background.png"];

setInterval(changeBG, 3500);

function changeBG(){
  console.log("changeBG");
  if (currentColor == colors.length) {
    currentColor = 0;
  }
  $("body").css("background-image", "url(" + colors[currentColor] + ")");
  currentColor++;
}