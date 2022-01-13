/*
 * All routes for Votes are defined here
 * Since this file is loaded in server.js into api/votes,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("results");
  });

  router.get("/dummy", (req, res) => {
    res.send({title: "Title", results: [
      {
        name: 'option1',
        percent: .8
    },
    {
      name: 'option2',
      percent: .2
  }
    ]});
  })
  return router;
};
