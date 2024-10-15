const router = require("express").Router();

const github_url = process.env.GITHUB_PROFILE_URI;
const linkedIn_url = process.env.LINKEDIN_PROFILE_URI;

router.use((req, res, next) => {
  res.locals.github_profile_url = github_url;
  res.locals.linkedIn_profile_url = linkedIn_url;
  next();
});

router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get("/register", (req, res) => {
  return res.render("auth/register");
});

router.get("/account", (req, res) => {
  return res.render("account");
});
module.exports = router;
