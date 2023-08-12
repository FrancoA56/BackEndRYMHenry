const { Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  const { id, name, origin, status, image, species, gender } = req.body;
  try {
    if (!id || !name || !origin || !status || !image || !species || !gender) {
      res.status(401).json({ error: "Faltan datos" });
    }
    await Favorite.findOrCreate({
      where: {
        id,
        name,
        origin,
        status,
        image,
        species,
        gender
      },
    });
    const myFavorites = await Favorite.findAll();
    return res.status(201).json(myFavorites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
