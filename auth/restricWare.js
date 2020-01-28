const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .then(usr => {
        if (usr && bcrypt.compareSync(password, usr.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Invalid credentials." });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Unable to access server at the moment/Unxpected server error?" });
      });
  } else {
    res.status(400).json({ mesage: "Please provide valid credentials" });
  }
}

module.exports = restricted;
