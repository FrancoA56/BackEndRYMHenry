const router = require('./routes');
const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = 3001;

server.use(morgan('dev'));

server.use(cors());

server.use(express.json());

server.use("/rickandmorty", router);

server.listen(PORT, () => {
  console.log(`server en puerto ${PORT}`);
});
