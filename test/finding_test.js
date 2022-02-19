const { describe, it, beforeEach } = require("mocha");
const MarioCharModel = require("../models/mariochar");
const assert = require("assert");

describe("Finding records", () => {
    let char;
    // creates a record in the database before finding it
    beforeEach((done) => {
        char = new MarioCharModel({
            name: "Mario Balotelli",
        });

        // saving to the database
        char.save()
            .then((result) => {
                console.log("Result=", result);
                // assert(char.isNew === false);

                // Use the done() to tell mongoose when the save is completed
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // find one record from the database
    it("Finds one record from the database", (done) => {
        MarioCharModel.findOne({ name: "Mario Balotelli" })
            .then((result) => {
                console.log("Result after finding the record is =", result);
                assert(result.name === "Mario Balotelli");
                // Use the done() to tell mongoose when the save is completed
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // find one record by ID from the database
    it("Finds one record by ID from the database", (done) => {
        MarioCharModel.findById({ _id: char._id })
            .then((result) => {
                console.log("Result after finding the record by ID =", result);
                assert(result._id.toString() === char._id.toString());
                // Use the done() to tell mongoose when the save is completed
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
