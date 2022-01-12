const pg = require('pg');

const Client = pg.Client;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

const client = new Client(config);

client.connect(() => {
  console.log('Connected to database');
});

module.exports = {

  addPoll: (poll) => {
    const columns = JSON.stringify(Object.keys(poll.polls)).replaceAll('"', '').slice(1, -1);
    const values = JSON.stringify([...Array(Object.keys(poll.polls).length).keys()].map(x => `$${++x}`)).replaceAll('"', '').slice(1, -1);
    // console.log(`INSERT INTO polls (${columns}) VALUES(${values}) RETURNING *;`);
    return client.query(
      `INSERT INTO polls (${columns}) VALUES(${values}) RETURNING *;`,
      Object.values(poll.polls))
      .then((result) => {
        // console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  addChoices: (choices) => {
    return client.query(
      'INSERT INTO choices(poll_id, choices) VALUES($1, $2::TEXT[]) RETURNING *; ',
      [choices.id, JSON.parse(choices.choices)])
      .then((result) => {
        // console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  addVote: (vote) => {
    return client.query(
      'INSERT INTO votes(${this:name}) VALUES(${this:csv}) RETURNING *;',
      vote)
      .then((result) => {
        console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

};