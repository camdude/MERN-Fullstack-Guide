const express = require("express");

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipOW6JzJtnnFqbLVRU62CM7sPdr60I0bBPX0hJw7=w408-h272-k-no",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipOW6JzJtnnFqbLVRU62CM7sPdr60I0bBPX0hJw7=w408-h272-k-no",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: "u2"
  }
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    const error = new HttpError('Could not find a place for the provided id.', 404);
    throw error;
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!places) {
    const error = new HttpError('Could not find a place for the provided user id.', 404);
    return next(error);
  }

  res.json({ places });
});

module.exports = router;
