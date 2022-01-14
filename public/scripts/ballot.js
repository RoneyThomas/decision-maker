$(document).ready(function () {
  console.log("Ready");

  loadBallot();
  // Enable Drag and drop
  $( "#choice-container" ).sortable();

  $('form').submit((event) => {
    event.preventDefault();

    // Parse poll vote
    const poll_votes = $("#choice-container").sortable("toArray").map(x=>x.slice(7));
    $.post("/api/vote/dummy", { poll_votes });
    console.log(poll_votes);
  $('form').replaceWith( `<h1>THANK YOU FOR VOTING</h1>`);
  })
});

const createBallotElement = function (input) {
  // Create XSS safe text
  const choice = `${escape(input)}`;

  // Create dynamic ids so the choice placement can be ready
  return $(`<li id="choice_${choice}" class="ballot-entry"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${choice}</li>`);

};

const renderBallot = function (choices) {
  let i = 0;
  for (const choice of choices) {
    i++;
    let $choice = createBallotElement(choice);
    $('#rank-container').append($(`<li class="ballot-entry">${numToRank(i)} pick</li>`));
    $('#choice-container').append($choice);
  }
};

const loadBallot = function () {
  $.get("/api/vote/dummy", (data) => {
    $(".poll-title").text(data.title)
    renderBallot(data.choices);
  });
};


