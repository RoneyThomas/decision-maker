// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const db = require("./lib/db.js");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pollsRoutes = require("./routes/polls");
const voteRoutes = require("./routes/vote");
const resultsRoutes = require("./routes/results");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/poll", pollsRoutes(db));
app.use("/api/vote", voteRoutes(db));
app.use("/api/results", resultsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results", (req, res) => {
  res.render("results");
});

app.get("/vote", (req, res) => {
  res.render("vote");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
