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
      res.status(500).json({ message: "Unable to add at the moment" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(usr => {
      if (usr && bcrypt.compareSync(password, usr.password)) {
        res.status(200).json({ message: `Welcome ${usr.username}` });
      } else {
        res
          .status(401)
          .json({ message: "Thou shall not pass. Invalid credentials." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to access server at the moment" });
    });
});

module.exports = router;
