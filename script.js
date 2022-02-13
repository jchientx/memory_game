document.addEventListener("DOMContentLoaded", function () {
  //const gameContainer = document.getElementById("game");
  const cards = document.querySelectorAll(".game-card");
  let numCards = cards.length;
  let card1 = null;
  let card2 = null;
  let faceupCount = 0;
  let currentScore = 0;
  let start = document.getElementById("start");
  let lowScore = localStorage.getItem("low-score");
  //let stopClick = false;

  if (lowScore) {
    document.getElementById("best-score").innerText = lowScore;
  }

  for (let card of cards) {
    card.addEventListener("click", handleCardClick);
  }

  let startBtn = document.getElementById("start-button");
  startBtn.addEventListener("click", startGame);

  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    console.log("parentElement: ", event.target.parentElement);
    // <div class="game-card">
    //   <div class="front">🐶</div>
    //   <div class="back">
    //     <img src="img/4.jpg">
    //   </div>
    // </div>

    // if (stopClick) {
    //   return;
    // }
    if (!event.target.classList.contains("front")) {
      return;
    }

    // To access at className an element use e.target.className

    if (card1 === null || card2 === null) {
      if (!event.target.parentElement.classList.contains("faceup")) {
        setScore(currentScore + 1);
      }
      //if (!card1 || !card2)
      event.target.parentElement.classList.add("faceup");
      //card1 = card1 || event.target;
      if (card1 === null) {
        card1 = event.target.parentElement;
      }
      console.log("card1: ", card1);
      card2 =
        event.target.parentElement === card1
          ? null
          : event.target.parentElement;
      console.log("card2: ", card2);
    }

    if (card1 && card2) {
      // stopClick = true;
      let jpg1 = card1.children[1].children[0].src;
      let jpg2 = card2.children[1].children[0].src;
      console.log(jpg1, jpg2);
      if (jpg1 === jpg2) {
        faceupCount += 2;
        console.log("faceupCount: ", faceupCount);
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        // stopClick = false;
      } else {
        setTimeout(function () {
          // card1.style.backgroundColor = "";
          // card2.style.backgroundColor = "";
          card1.classList.remove("faceup");
          card2.classList.remove("faceup");
          card1 = null;
          card2 = null;
          // stopClick = false;
        }, 1000);
      }
    }

    if (faceupCount === numCards) {
      endGame();
    }
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore;
  }

  function startGame() {
    // Goal: install cards and reset the score
    setScore(0);
    start.classList.add("playing");
    let index = []; // ["1","2",..."12"]
    for (let i = 1; i <= numCards / 2; i++) {
      index.push(i.toString()); // path should be string
    }
    let pairs = shuffle(index.concat(index));
    // ["1","3","2","1",..."12"] (total 24, each "number" has two img)
    for (let i = 0; i < cards.length; i++) {
      let path = "img/" + pairs[i] + ".jpg"; // get url
      cards[i].children[1].children[0].src = path; // img.src = url
      // src is the property of <img> tag and can be accessed
      // by javascript to assing the image url
    }
  }

  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  function endGame() {
    let end = document.getElementById("end");
    let scoreHeader = end.children[1];
    scoreHeader.innerText = "Score: " + currentScore;
    let lowScore = localStorage.getItem("low-score") || Infinity;
    if (currentScore < lowScore) {
      scoreHeader.innerText += " - NEW BEST SCORE!";
      localStorage.setItem("low-score", currentScore);
    }
    document.getElementById("end").classList.add("game-over");
  }
});

//let shuffledColors = shuffle(COLORS);

/*
  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }
  */

// when the DOM loads
// createDivsForColors(shuffledColors);
