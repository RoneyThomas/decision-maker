$(function () {
  console.log("sometext");
  loadBallot();
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createBallotElement = function (input) {
  // Create XSS safe text
  const choice = `${escape(input)}`;
  return $(`<li class="ballot-entry">${choice}</li>`);
};

const numToRank = function (num) {
  switch (true) {
    // odd cases where rank 11, 12, 13 isn't 11st, 12nd, 13rd
    case num === 11:
      return "11th";
    case num === 12:
      return "12th";
    case num === 13:
      return "13th";
    //regular cases
    case num % 10 === 1:
      return num + "st"
    case num % 10 === 2:
      return num + "nd"
    case num % 10 === 3:
      return num + "rd"
    default:
      return num + "th"
  }
};

const renderBallot = function (choices) {
  let i = 0;
  for (const choice of choices) {
    i++;
    let $rankNumber = createBallotElement(numToRank(i));
    let $choice = createBallotElement(choice);
    $('#rank-container').append($rankNumber);
    $('#choice-container').append($choice);
  }
};

const loadBallot = function () {
  $.get("/api/vote/votes", (data) => {
    renderBallot(data);
  });
};


