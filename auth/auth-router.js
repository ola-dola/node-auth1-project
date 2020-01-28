const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const securedUser = {
    username,
    password: hashPassword
  };

  Users.add(securedUser)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Unable to add at the moment"});
    });
});

module.exports = router;