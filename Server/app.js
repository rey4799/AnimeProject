if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require('cors')
const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routers"));

app.use(errorHandler);

module.exports = app;
