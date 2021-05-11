const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id }).first();
};

const create = async (car) => {
  const [id] = await db("car").insert(car);
  return getById(id);
};

exports.module = { getAll, getById, create };
