$(document).ready(function() {
  var wins = 0;
  var losses = 0;
  var currentNumber = 0;

  var randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var winningNumber = randomInteger(19, 120);

  $("#winningNumber").html(winningNumber);
  var blueCrystal = randomInteger(1, 12);
  var yellowCrystal = randomInteger(1, 12);
  var greenCrystal = randomInteger(1, 12);
  var orangeCrystal = randomInteger(1, 12);

  var newValues = function() {
    blueCrystal = randomInteger(1, 12);
    yellowCrystal = randomInteger(1, 12);
    greenCrystal = randomInteger(1, 12);
    orangeCrystal = randomInteger(1, 12);
  };

  $("#blue-crystal").on("click", function() {
    currentNumber += blueCrystal;
    $("#currentNumber").html(currentNumber);
    updateNumber();
  });

  $("#yellow-crystal").on("click", function() {
    currentNumber += yellowCrystal;
    $("#currentNumber").html(currentNumber);
    updateNumber();
  });

  $("#green-crystal").on("click", function() {
    currentNumber += greenCrystal;
    $("#currentNumber").html(currentNumber);
    updateNumber();
  });

  $("#orange-crystal").on("click", function() {
    currentNumber += orangeCrystal;
    $("#currentNumber").html(currentNumber);
    updateNumber();
  });

  var updateNumber = function() {
    if (winningNumber === currentNumber) {
      wins++;
      alert("You've won!")
      $("#wins").html(wins);
      $("#winningNumber").empty();
      winningNumber = randomInteger(19,120);
      $("#winningNumber").html(winningNumber);
      currentNumber = 0;
      $("#currentNumber").html(currentNumber)
      newValues();
    }
    if (winningNumber < currentNumber) {
      losses++;
      alert("Better luck next time!")
      $("#losses").html(losses);
      $("#winningNumber").empty();
      winningNumber = randomInteger(19,120);
      $("#winningNumber").html(winningNumber);
      currentNumber = 0;
      $("#currentNumber").html(currentNumber)
      newValues();
    }
  }
});
