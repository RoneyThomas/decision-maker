// Client facing scripts here

const addCandidate = () => {
  var node = document.createElement("li");
  var textnode = document.createTextNode(document.getElementById("candidate").value);
  node.appendChild(textnode);
  document.getElementById("candidates").appendChild(node);
  document.getElementById("candidate").value = "";
}
