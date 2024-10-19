/* server.js */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;
const path = require("path");
// FILES
const connect = require("./src/db/connect.db.js");
const { fileRouter } = require("./src/routes/files.routes.js");
const { userRouter } = require("./src/routes/user.routes.js");
const { webRouter } = require("./src/routes/web.routes.js");
// view ejs engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// ROUTES
/*following route helps to routing all ejs pages
- web route */
app.use("/", webRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/user", userRouter);

// node js server is running from here ...
const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log("server is running on port http://localhost:" + port);
    });
  } catch (error) {
    console.log("err occurred at running a server " + error);
  }
};
startServer();
