const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const { data } = await axios(`${URL}${id}`);
    const {
      status,
      name,
      species,
      origin: { name: origin },
      image,
      gender,
      location: { name: location },
      episode,
    } = data;

    const character = {
      id,
      name,
      species,
      origin,
      image,
      gender,
      location,
      status,
      episode
    };

    return name
      ? res.status(200).json(character)
      : res.status(404).send("Not Found");

  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

module.exports = getCharById;
