const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const teamAData = {
    team: 'Team B',
    message: 'Welcome to Team B endpoint!'
  };
  res.json(teamAData);
});

module.exports = router;
