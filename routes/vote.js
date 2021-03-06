/*
 * All routes for Votes are defined here
 * Since this file is loaded in server.js into api/votes,
 *   these routes are mounted onto /votes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body);
    db.getVote(req.query.id)
      .then((vote) => {
        console.log(vote);
        res.json({ vote: vote });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    db.addVote({ ...req.body })
      .then(property => {
        res.json(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
