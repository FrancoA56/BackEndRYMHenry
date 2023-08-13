const { Router } = require("express");
const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const deleteFav = require("../controllers/deleteFav");
const postFav = require("../controllers/postFav");
const postUser = require("../controllers/postUsers")

const router = Router();


router.get("/character/:id", getCharById);
router.get("/login", login);
router.post("/register", postUser);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
