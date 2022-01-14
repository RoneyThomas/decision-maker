/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const matches = require('../lib/post-validate');
const sendPollCreationEmail = require('../lib/email');

const pollRequestRule = {
  decision: 'string',
  email: 'string',
  choices: 'object'
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("Inside the get");
    db.getPoll(req.query.id)
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
        })
        .then(() => {
          console.log("Poll id", poll.id);
          const adminLink = process.env.BASE_URL + `/results?id=${poll.id}`;
          const pollLink = process.env.BASE_URL + `/vote?id=${poll.id}`;
          return sendPollCreationEmail(poll.email, adminLink, pollLink);
        })
        .then(statusCode => {
          if (statusCode === 202) {
            console.log({
              status: "Success",
              adminId: poll.admin_id,
              pollId: poll.id
            });
            res.json({
              status: "Success",
              adminId: poll.admin_id,
              pollId: poll.id
            });
          } else {
            res.json({
              status: "Fail",
            });
          }
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
