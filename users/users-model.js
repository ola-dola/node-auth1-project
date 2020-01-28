const db = require("../data/dbConfig");

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(data) {
  return db("users")
    .insert(data)
    .then(newId => {
      const [id] = newId;
      return findById(id);
    });
}

module.exports = {
    findById,
    find,
    add
}