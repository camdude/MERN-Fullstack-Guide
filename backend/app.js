const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json({}));

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://cameron:mXMRdFJkMfrCmBkc@cluster0-oevkj.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("[server]", "Database Connected");

    app.listen(5000);
    console.log("[server]", "Now listening on port 5000");
  })
  .catch(err => {
    console.log(err);
  });
