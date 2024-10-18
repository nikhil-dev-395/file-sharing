const router = require("express").Router();
const {
  github_profile_url,
  linkedIn_profile_url,
} = require("../constants/constants.js");
// const github_url = process.env.GITHUB_PROFILE_URI;
// const linkedIn_url = process.env.LINKEDIN_PROFILE_URI;

router.use((req, res, next) => {
  res.locals.github_profile_url = github_profile_url;
  res.locals.linkedIn_profile_url = linkedIn_profile_url;
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
  return res.render("account", {
    fileName: "hero",
    fileSize: 200,
    fileDownloadUrl: "https://code.visualstudio.com/docs/editor/editingevolved",
  });
});

router.get("*", (req, res) => {
  return res.render("404/not-found");
});

module.exports = router;
