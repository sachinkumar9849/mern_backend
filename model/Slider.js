const mongoose = require("mongoose");
const { Schema } = mongoose;

const sliderSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
});
const virtual = sliderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
sliderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = { Slider };
