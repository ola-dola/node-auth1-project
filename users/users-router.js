const express = require("express");
const Users = require("../users/users-model");
const restricted = require('../auth/restricWare');

const router = express.Router();

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve users at the moment" });
    });
});

module.exports = router;