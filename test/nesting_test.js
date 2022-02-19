const { describe, it, beforeEach } = require("mocha");
const assert = require("assert");
const AuthorModel = require("../models/author");
const mongoose = require("mongoose");

describe("Nesting Records", function () {
    beforeEach((done) => {
        // Drop the collection
        mongoose.connection.collections.authors
            .drop()
            .then(() => {
                console.log("authors collection dropped");
                done();
            })
            .catch((err) => console.log(err));
    });
    //     // creates a book with sub-documents
    it("Creates an array with sub-documents", (done) => {
        const author = new AuthorModel({
            name: "Patrick Rothfuss",
            age: 40,
            books: [{ title: "Strongest man in singapore", pages: 500 }],
        });

        // save to the db
        author.save().then(() => {
            AuthorModel.findOne({ name: "Patrick Rothfuss" }).then((record) => {
                console.log("The new record is:", record);
                assert(record.books.length === 1);
                done();
            });
        });
    });

    //  adds a book to an author
    it("Adds a book to an author", function (done) {
        const author = new AuthorModel({
            name: "Patrick Rothfuss",
            age: 40,
            books: [
                {
                    title: "Strongest man in singapore",
                    pages: 500,
                },
            ],
        });

        // save to the db
        author.save().then(() => {
            AuthorModel.findOne({ name: "Patrick Rothfuss" })
                .then((record) => {
                    record.books.push({ title: "Wise Man's Fear", pages: 400 });
                    // save the new record
                    record.save().then(() => {
                        AuthorModel.findOne({ name: "Patrick Rothfuss" }).then((result) => {
                            assert(result.books.length === 2);
                            done();
                        });
                    });
                })
                .then((record) => {
                    console.log("The new record is:", record);
                    assert(record.books.length === 1);
                    done();
                });
        });
    });
});
