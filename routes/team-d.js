const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const teamAData = {
    team: "Team D",
    message: "Welcome to Team D endpoint!",
  };
  res.json(teamAData);
});

module.exports = router;
