const router = require ('express').Router();
const Workout = require('../models/workout.js');

module.exports = function (app) {

    //get workouts from the DB
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