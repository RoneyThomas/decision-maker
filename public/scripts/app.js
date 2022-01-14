const choices = [];
{/* For deleting icon
  <svg xmlns="http://www.w3.org/2000/svg"
  class="absolute top-1.5 right-2 h-6 w-6 hover:stroke-red-600" fill="none" viewBox="0 0 24 24"
  stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> */}
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
    $.post("/api/poll", poll, "json").done((data) => console.log(data));
  });

  sortable('.sortable');
  // <tr>
  //   <td class="py-4 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">The Sliding Mr. Bones
  //   </td>
  // </tr>
  let searchParams = new URLSearchParams(window.location.search);
  $.get("/api/poll?id=" + searchParams.get('pollId'), (data) => {
    console.log(data);
    $('#desicion').text(data.poll.decision);
    for (const x of data.poll.choices) {
      $('.sortable').append(`<tr>
      <td class="py-4 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">${x}
      </td>
    </tr>`);
    }
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
      id: searchParams.get('pollId')
    };
    console.log(vote);


    $.post("/api/vote", vote, "json").done((data) => {
      window.location.href = '/vote-recorded';
    });
  });
});
// ?pollId=524c1254-d3af-4cca-9471-c5e493b5456c