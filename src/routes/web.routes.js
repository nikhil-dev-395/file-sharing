const router = require("express").Router();
const {
  github_profile_url,
  linkedIn_profile_url,
} = require("../constants/constants.js");

// with this middleware we can send github & linedin links
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
  /*
  here i only add this values manually to show some data in ejs but add here mongodb db connection quickly to directly fetch the data form db
  */
  return res.render("account", {
    fileName: "hero",
    fileSize: 200,
    fileDownloadUrl: "https://code.visualstudio.com/docs/editor/editingevolved",
  });
});

router.get("*", (req, res) => {
  return res.render("404/not-found");
});

module.exports = { webRouter: router };
