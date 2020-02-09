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

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

module.exports = {
  findById,
  find,
  add,
  findBy
};
