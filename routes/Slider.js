const express = require("express");
const { createSlider, fetchSlider } = require("../controller/Slider");

const router = express.Router();

router.post("/", createSlider).get("/", fetchSlider);
exports.router = router;
