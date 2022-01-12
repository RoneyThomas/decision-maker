/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const matches = require('../lib/post-validate');

const pollRequestRule = {
  decision: 'string',
  email: 'string',
  choices: 'object'
};

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log("Inside the get");
    console.log(req.params.id);
    db.getPoll(req.params.id)
      .then((poll) => {
        res.json({ poll: poll });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/", (req, res) => {
    console.log("Inside post");
    console.log(req.body);
    if (matches(req.body, pollRequestRule)) {
      const { choices, ...polls } = req.body;
      console.log(choices);
      let poll, choice;
      db.addPoll({ polls })
        .then(propertyPoll => {
          poll = propertyPoll;
          console.log(propertyPoll);
          return db.addChoices({ choices: choices, id: propertyPoll.id });
        })
        .then(propertyChoice => {
          choice = propertyChoice;
          console.log(poll, choice);
          res.json({ poll: poll, choice: choice });
        })
        .catch(e => {
          console.error(e);
          res.send(e);
        });
    } else {
      res.send("Invalid POST body");
    }

  });
  return router;
};
