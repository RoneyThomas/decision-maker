const choices = [];
const $button = `<button></button>`;

const createChoicesList = () => {
  let elements = $();
  const $ul = $('<ul></ul>').addClass('w-48 text-sm font-medium rounded-lg border bg-neutral-900 border-gray-500 text-gray-200').attr('id', 'choiceList');
  for (let i = 0; i < choices.length; i++) {
    elements = elements.add($('<div></div>').addClass("relative")
      .append($('<li></li>')
        .addClass(i !== choices.length - 1 ? "py-2 px-4 w-full border-b border-gray-500" : "py-2 px-4 w-full").text(choices[i]).append($button)));
  }
  return $ul.append(elements);
};

$(() => {
  $("#addChoice").on("click", function(e) {
    e.preventDefault(); // <<-- required to stop the refresh
    //action inside function
    if ($("#choice").val() !== '') {
      choices.push($("#choice").val());
      $("#choice").val("");
      $("#choiceList").remove();
      $("#addChoice").after(createChoicesList());
    }
  });

  $("#poll").submit(function(e) {
    e.preventDefault();
    console.log("Inside poll");
    const poll = {
      decision: $("#question").val(),
      choices: choices,
      email: $("#email").val()
    };
    $.post("/api/poll", poll, "json").done((data) => {
      window.location.href = '/vote-created';
    });
  });

  let searchParams = new URLSearchParams(window.location.search);
  $.get("/api/poll?id=" + searchParams.get('id'), (data) => {
    console.log(data);
    $('#desicion').text(data.poll.decision);
    for (const x of data.poll.choices) {
      $('.sortable').append(`<tr>
      <td class="flex flex-row space-x-6 py-4 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>
      <p>${x}</p>
      </td>
    </tr>`);
    }
    sortable('.sortable');
  });

  $.get("/api/vote?id=" + searchParams.get('id'), (data) => {
    console.log(data);
    let result = [];
    let score = {};
    for (const x of data.vote) {
      result.push(x.poll_votes);
    }
    console.log(result);
    for (let x = 0; x < result[0].length; x++) {
      for (let y of result) {
        if (y[x] in score) {
          score[y[x]] += (result[0].length - (x + 1));
        } else {
          score[y[x]] = (result[0].length - (x + 1));
        }
      }
    }
    console.log(score);
    const sortable = Object.entries(score)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    const chart = {
      type: 'bar',                                // Show a bar chart
      data: {
        labels: Object.keys(sortable),   // Set X-axis labels
        datasets: [{
          label: 'Poll Result',                         // Create the 'Users' dataset
          data: Object.values(sortable)           // Add data to the chart
        }]
      }
    };
    console.log(chart);
    for (const [key, val] of Object.entries(sortable)) {
      $('#results').append(`<tr>
      <td class="py-4 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">${key}
      </td>
      <td class="py-4 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">${val}
      </td >
    </tr > `);
    }
    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chart))}`;
    $('#results-main').append(
      `<img width="500" height="200" src=${url}>`
    );
  });


  $("#vote").on("click", function(e) {
    e.preventDefault(); // <<-- required to stop the refresh
  });

  $("#voteSubmit").click(function() {
    let choices = [];
    $('.sortable').find("td").each(function() {
      choices.push($(this).text().trim());
    });
    console.log(choices);
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get('pollId'));
    const vote = {
      choices: choices,
      id: searchParams.get('id')
    };
    console.log(vote);
    $.post("/api/vote", vote, "json").done((data) => {
      window.location.href = '/vote-recorded';
    });
  });
});