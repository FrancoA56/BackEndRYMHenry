const router = require('./routes');
const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");

server.use(morgan('dev'));

server.use(cors());

server.use(express.json());

server.use("/rickandmorty", router);

module.exports = server;