/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addChoices, addPoll } = require('../lib/db');

module.exports = (db) => {

  router.post("/", (req, res) => {
    db.addPoll({ ...req.body })
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
    db.addChoices({ ...req.body })
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });
  return router;
};
