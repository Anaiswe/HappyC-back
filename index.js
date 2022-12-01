// Simple sample server
// Il faut prévoir un .env pour les variables d'environnement
// install/import Cors
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

app.use(cors());

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
// Il faudra bien faire tous les process env (port mongo etc..)
