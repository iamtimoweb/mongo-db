const { describe, it, beforeEach } = require("mocha");
const MarioCharModel = require("../models/mariochar");
const assert = require("assert");

describe("Deleting records", () => {
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

    // Deletes one record from the database
    it("Deletes one record from the database", (done) => {
        MarioCharModel.findOneAndDelete({ name: "Mario Balotelli" })
            .then(() => {
                MarioCharModel.findOne({ name: "Mario Balotelli" }).then((result) => {
                    assert(result === null);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
