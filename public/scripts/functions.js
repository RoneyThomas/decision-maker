const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
      return num + "st";
    case num % 10 === 2:
      return num + "nd";
    case num % 10 === 3:
      return num + "rd";
    default:
      return num + "th";
  }
};
