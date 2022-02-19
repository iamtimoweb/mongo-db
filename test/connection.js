const { before, beforeEach } = require("mocha");
const mongoose = require("mongoose");

// connect to the database before running the tests
before((done) => {
    //connect to mongodb
    mongoose.connect("mongodb://localhost/mongo-db");

    // The connect function may take long to complete the connection , we should therefore check whether its open and its finished with the connection

    //Returns a reference to the EventEmitter, so that calls can be chained.
    mongoose.connection
        .once("open", () => {
            console.log("connection to database is successful");
            // Use the done() to tell mongoose when the connection is completed
            done();
        })
        .on("error", (err) => console.log("Connection Error: ", err));
});

// Drop the mariocharacter collection before each test
beforeEach((done) => {
    // Drop the collection
    mongoose.connection.collections.mariochars
        .drop()
        .then(() => {
            console.log("mariochars collection dropped");
            done();
        })
        .catch((err) => console.log(err));
});
