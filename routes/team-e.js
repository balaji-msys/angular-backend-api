const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const teamAData = {
    team: 'Team E',
    message: 'Welcome to Team E endpoint!'
  };
  res.json(teamAData);
});

module.exports = router;
