const router = require("express").Router();

router.get("/ss", (req, res) => {
  return res.render("index", {
    title: "wolf share",
  });
});

module.exports = { fileRouter: router };
