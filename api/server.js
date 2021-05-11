const express = require("express");
const carsRouter = require("../api/cars/cars-router");
const { errorHandler } = require("../api/cars/cars-middleware");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);
server.use("*", errorHandler);

module.exports = server;
