const { describe, it } = require("mocha");
const MarioCharModel = require("../models/mariochar");
const assert = require("assert");

describe("Saving a record to the database", () => {
    it("Saves a record to the database", (done) => {
        const char = new MarioCharModel({
            name: "Mario Balotelli",
        });

        // saving to the database
        char.save()
            .then((result) => {
                console.log('Result=', result)
                assert(char.isNew === false);

                // Use the done() to tell mongoose when the save is completed
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
