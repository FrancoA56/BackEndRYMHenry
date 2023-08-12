const { User } = require("../DB_connection");

const login = async (req, res) => {
  const { user, email, password } = req.query;
  try {
    if (!user || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (foundUser.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    return res.status(200).json({ access: true });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};

module.exports = login;
