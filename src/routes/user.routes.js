const router = require("express").Router();

router.get("/account", account);

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get("/register", (req, res) => {
  return res.render("auth/register");
});

module.exports = router;
