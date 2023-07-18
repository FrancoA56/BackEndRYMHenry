const axios = require("axios");

const getCharById = (res, id) => {
  axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then(({ data }) => {
      const {
        id,
        name,
        gender,
        species,
        origin: { name: origin },
        image,
        status,
        location: { name: location },
      } = data;
      let character = {
        id,
        name,
        gender,
        species,
        origin,
        image,
        status,
        location,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(character));
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(err.message);
    });
};

module.exports = getCharById;