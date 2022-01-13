$(document).ready(() => {
  console.log("ready");
  loadResults();
});


//name: string, percent <= 1: float, rank: string
//result = { name, percent}
const createResultElement = function(result, rank) {
  // Create XSS safe text
  const safeName = `${escape(result.name)}`;
  // convert decimal to integer for percentage
  const parsePercentage = result.percent * 100;

  return $(`
    <section class="result-box">
      <div class="option-name"><h5>${rank}</h5>${safeName}</div>
        <span class="result-bar-wrapper">
          <span class="result-bar" style="width: ${parsePercentage}%;"></span>
        </span>
        <div>${parsePercentage}%</div>
    </section>
  `);
};

// Assumes results are ordered by most votes
const renderResults = function(results) {
  let i = 0;
  for (const result of results) {
    i++;
    let $result = createResultElement(result, numToRank(i));
    $("#results-list").append($result);
  }
};

const loadResults = function () {
  $.get("/api/results/dummy", (data) => {
    $('.poll-title h2').text(data.title);
    renderResults(data.results);
  })
}

