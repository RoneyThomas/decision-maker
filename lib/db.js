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

const addPoll = (poll) => {
  return client.query(
    'INSERT INTO polls(${this: name}) VALUES(${ this: csv }) RETURNING *; ',
    [poll.name, poll.description, poll.electorateSize, poll.startTime, poll.endTime, poll.email])
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addPoll;

const addChoices = (choices) => {
  return client.query(
    'INSERT INTO choices(${this: name}) VALUES(${ this: csv }) RETURNING *;',
    [choices.pollId, choices.choices, choices.maxSelection])
    /* eslint-enable no-eval */
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addChoices;

const addVote = (vote) => {
  return client.query(
    'INSERT INTO votes(${this: name}) VALUES(${ this: csv }) RETURNING *;',
    [vote.pollId, vote.pollVotes])
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addVote;