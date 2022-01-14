$(function () {
  console.log("Ready");
  
  loadBallot();
  $( "#choice-container" ).sortable();

  $('form').submit((event) => {
    event.preventDefault();

    const poll_votes = $("#choice-container").sortable("toArray").map(x=>x.slice(7));
    $.post("/api/vote/dummy", { poll_votes });
    console.log(poll_votes);
  $('form').replaceWith( `<h1>THANK YOU FOR VOTING</h1>`);
  })
});


const createBallotElement = function (input) {
  // Create XSS safe text
  const choice = `${escape(input)}`;
  return $(`<li id="choice_${choice}" class="ballot-entry">${choice}</li>`);

};

// const numToRank = function (num) {
//   switch (true) {
//     // odd cases where rank 11, 12, 13 isn't 11st, 12nd, 13rd
//     case num === 11:
//       return "11th";
//     case num === 12:
//       return "12th";
//     case num === 13:
//       return "13th";
//     //regular cases
//     case num % 10 === 1:
//       return num + "st";
//     case num % 10 === 2:
//       return num + "nd";
//     case num % 10 === 3:
//       return num + "rd";
//     default:
//       return num + "th";
//   }
// };

const renderBallot = function (choices) {
  let i = 0;
  for (const choice of choices) {
    i++;
    let $rankNumber = createBallotElement(numToRank(i), null);
    let $choice = createBallotElement(choice, i);
    $('#rank-container').append($rankNumber);
    $('#choice-container').append($choice);
  }
};

const loadBallot = function () {
  $.get("/api/vote/dummy", (data) => {
    renderBallot(data);
  });
};


