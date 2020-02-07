var notes = require("../db/db.json");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        return res.json(notes);
    });



    app.post("/api/notes", function (req, res) {
        var newNote = req.body;

        console.log(newNote);

        notes.push(newNote);
    })
}