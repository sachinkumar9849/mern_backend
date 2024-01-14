const { Slider } = require("../model/Slider");

exports.createSlider = async (req, res) => {
 
  const slider = new Slider(req.body);
  try {
    const doc = await slider.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchSlider = async (req, res) => {
 
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
