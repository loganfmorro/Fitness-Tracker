const router = require ('express').Router();
const Workout = require('../models/Workout.js');

module.exports = function (app) {

    //get workouts from the db
    app.get("/api/workouts", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            console.log("WORKOUTS");
            console.log(dbWorkout);
            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;
            });
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // add an exercise to the db
    app.put("/api/workouts/:id", (req, res) => {
        Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });
    });

     //create workout and post to db
    app.post("/api/workouts", ({ body }, res) => {
        Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

     // get workouts in range from the db
     app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            console.log("ALL WORKOUTS");
            console.log(dbWorkout);
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
}