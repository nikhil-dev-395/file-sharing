const { login, register } = require("../controllers/auth.controllers.js");

const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

module.exports = { userRouter: router };
