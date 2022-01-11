/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/new", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const electorate_size = req.body.electorate_size;
    const hours = req.body.hours;
    const vote_url = req.body.vote_url;
    const admin_url = req.body.admin_url;
    const email = req.body.email;

    db.query(`
    INSERT INTO polls
    (name, description, electorate_size, start_time, end_time, vote_url, admin_url, email)
    VALUES
    ($1, $2, $3, now()::date, now()::date + interval '$4 hours', $5, $6, $7)
    RETURNING id
    ;
  `, [name, description, electorate_size, hours, vote_url, admin_url, email])
    // .then(data => {
    //   const users = data.rows;
    //   res.json({ users });
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
  });
  return router;
};
