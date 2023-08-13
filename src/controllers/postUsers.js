const { User } = require("../DB_connection");

const postUser = async (req, res) => {
  const { user, email, password } = req.body;
  try {
    if (!user || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const usuario = await User.create({ user, email, password });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
