const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// MongoDB

mongoose.connect(process.env.MONGODB_URI);
// Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const placesRoutes = require("./routes/places");
app.use(placesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello !" });
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is ok!");
});
