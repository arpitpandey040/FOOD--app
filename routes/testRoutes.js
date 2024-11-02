const express = require("express");
const { testUserController } = require("../controllers/testController");

const router = express.Router();

// GET || POST || UPDATE || DELETE

router.get("/test-user", testUserController);

module.exports = router;
