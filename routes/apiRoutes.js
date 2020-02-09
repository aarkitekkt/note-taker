var notes = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        return res.json(notes);
    });



    app.post("/api/notes", function (req, res) {
        var newNote = req.body;

        console.log(newNote);

        fs.readFile("C:/Users/johns/Developer/uofu/sandbox/homework/note-taker/db/db.json", "utf8", function (err, notes) {

            if (err) {
                console.log(err);
            } else {

                notes = JSON.parse(notes);

                notes.push(newNote);

                console.log(notes);

                fs.writeFile("C:/Users/johns/Developer/uofu/sandbox/homework/note-taker/db/db.json", JSON.stringify(notes), function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("added " + JSON.stringify(newNote) + " to db.json");
                })


            }

        })
    });
};


