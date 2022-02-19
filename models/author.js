const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Relational Schema */
const BookSchema = new Schema({
    title: String,
    pages: Number,
});
// create schema for the model
const AuthorSchema = new Schema({
    name: String,
    age: Number,
    books: [BookSchema],
});

// model for the collection
const AuthorModel = mongoose.model("Author", AuthorSchema);

// export this module so that it can be imported by other modules
module.exports = AuthorModel;
