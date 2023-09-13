const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const teamAData = {
    team: 'Team A',
    message: 'Welcome to Team A endpoint!'
  };
  res.json(teamAData);
});

router.get('/aa', (req, res) => {
    const teamAData = {
      team: 'Team AA',
      message: 'Welcome to Team AA endpoint!'
    };
    res.json(teamAData);
  });

module.exports = router;
