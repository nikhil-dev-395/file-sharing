const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;
const path = require("path");
// FILES
const connect = require("./src/db/connect.db.js");
// view ejs engine
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// ROUTES
// app.use("/api/files", require("./src/routes/files.routes"));
// app.use("/files" , require())
// app.use("/api/user/v1" , require())

// web route
//this route helps to routing all ejs pages
app.use("/", require("./src/routes/web.routes"));

const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log("server is running on port http://localhost:" + port);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
