// Client facing scripts here

const addCandidate = () => {
  var node = document.createElement("li");
  var textnode = document.createTextNode(document.getElementById("candidate").value);
  node.appendChild(textnode);
  document.getElementById("candidates").appendChild(node);
  document.getElementById("candidate").value = "";
}

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createBallotElement = function(choice) {
  // Create XSS safe text
  const choice = `${escape(choice)}`;
  return $(`<li class="ballot-entry">${choice}</li>`);
};

const numToRank = function(num) {
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

const renderBallot = function(choices) {
  let i = 0;
  for (const choice of choices) {
    i++;
    let $rankNumber = createBallotElement(numToRank(i));
    let $choice = createBallotElement(choice);
    $('#rank-container').append($rankNumber);
    $('#choice-container').append($choice);
  }
}

const loadBallot = function() {
  $.get("vote", (data) => {
    renderBallot(choices);
  });
};
