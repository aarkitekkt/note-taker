var notes = require("../db/db.json");
var fs = require("fs");
var path = require("path");

module.exports = function (app) {

    var db = path.join(__dirname, "../db/db.json");

    app.get("/api/notes", function (req, res) {

        fs.readFile(db, "utf8", function (err, notes) {

            if (err) {
                console.log(err);
            } else {

                notes = JSON.parse(notes);

                return res.json(notes);
            }

        });

    });

    app.post("/api/notes", function (req, res) {
        var newNote = req.body;

        console.log(newNote);

        fs.readFile(db, "utf8", function (err, notes) {

            if (err) {
                console.log(err);
            } else {

                notes = JSON.parse(notes);

                notes.push(newNote);

                for (let i = 0; i < notes.length; i++) {
                    notes[i].id = i.toString();
                }

                fs.writeFile(db, JSON.stringify(notes), function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("added " + JSON.stringify(newNote) + " to db.json");
                })

                console.log(notes);
            }
        });

        res.json({ ok: true });

    });

    app.get("/api/notes/:note", function (req, res) {
        var chosen = req.params.note;

        console.log(chosen);

        for (let i = 0; i < notes.length; i++) {
            if (chosen === notes[i].id) {
                return res.json(notes[i])
            }
        }

        return res.json("That ID number does not exist");
    })

    app.delete("/api/notes/:note", function (req, res) {

        var chosen = req.params.note;

        console.log(chosen);

        fs.readFile(db, "utf8", function (err, notes) {

            if (err) {
                console.log(err);
            } else {

                notes = JSON.parse(notes);

                for (let i = 0; i < notes.length; i++) {
                    if (chosen === notes[i].id) {
                        notes.splice(i, 1);
                    }
                }

                for (let i = 0; i < notes.length; i++) {
                    notes[i].id = i.toString();
                }

                console.log(notes);

                fs.writeFile(db, JSON.stringify(notes), function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("removed " + JSON.stringify(chosen) + " from db.json");

                })


            }
        })

        res.json({ ok: true });
    })
};
