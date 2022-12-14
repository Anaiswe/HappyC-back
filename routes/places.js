const express = require("express");
const router = express.Router();

const dataBase = "../data/places.json";
const places = require(`${dataBase}`);

router.get("/", async (req, res) => {
  try {
    const { name, type } = req.query;
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    let newPlaces = [];
    let newName = new RegExp(name, "i");

    if (type && name) {
      let newType = type.split(",");

      newPlaces = places.filter(
        (place) =>
          newName.test(place.name) === true && newType.includes(place.type)
      );
      res.status(200).json(newPlaces.slice(0, limit));
      res.status(200).json(newPlaces.slice(0, skip));
    }

    if (name) {
      newPlaces = places.filter((place) => newName.test(place.name));
      res.status(200).json(newPlaces.slice(0, limit));
      res.status(200).json(newPlaces.slice(0, skip));
    }
    if (type) {
      let newType = type.split(",");

      newPlaces = places.filter((place) => newType.includes(place.type));
      res.status(200).json(newPlaces.slice(0, limit));
      // res.status(200).json(newPlaces.slice(0, skip));
    } else {
      res.status(200).json(places.slice(0, limit));
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// place by ID

router.get("/places/:placeId", async (req, res) => {
  try {
    const uniquePlace = places.find(
      (place) => `:${place.placeId}` === req.params.placeId
    );
    res.json(uniquePlace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
