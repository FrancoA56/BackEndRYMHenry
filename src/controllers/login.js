const usuarios = require("../utils/users");

const login = (req, res) => {
  const { user, email, password } = req.query;

  const USER = usuarios.find(
    (usuario) =>
      usuario.user === user &&
      usuario.email === email &&
      usuario.password === password
  );

  if (USER) {
    return res.status(200).json({ access: true });
  } else return res.status(403).json({ access: false });
};

module.exports = login;
