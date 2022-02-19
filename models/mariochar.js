const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema for the model
const MarioCharSchema = new Schema({
    name: String,
    weight: Number,
});

// model for the collection
const MarioCharModel = mongoose.model("Mariochar", MarioCharSchema);

// export this module so that it can be imported by other modules
module.exports = MarioCharModel;
