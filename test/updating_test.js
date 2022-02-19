const { describe, it, beforeEach } = require("mocha");
const MarioCharModel = require("../models/mariochar");
const assert = require("assert");

describe("Updating records", () => {
    let char;
    // creates a record in the database before finding it
    beforeEach((done) => {
        char = new MarioCharModel({
            name: "Mario Balotelli",
            weight: 50,
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

    // Updates one record from the database
    it("Updates one record from the database", (done) => {
        MarioCharModel.findOneAndUpdate({ name: "Mario Balotelli" }, { name: "Christiano Ronaldo" })
            .then(() => {
                MarioCharModel.findOne({ _id: char._id }).then((result) => {
                    console.log("The updated recorded is: ", result);
                    assert(result.name === "Christiano Ronaldo");
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Updates the weight by 1 in the database
    it("Updates the weight by 1 in the database", (done) => {
        MarioCharModel.updateMany({}, { $inc: { weight: 1 } })
            .then(() => {
                MarioCharModel.findOne({ name: "Mario Balotelli" }).then((result) => {
                    console.log("The weight is now : ", result);
                    assert(result.weight === 51);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
