const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
} = require("../controllers/resturantController");

// create router
const router = express.Router();

// Resturant routes
router.post("/create", authMiddleware, createResturantController);

module.exports = router;
