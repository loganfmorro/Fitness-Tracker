const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    //day of workout
    day: {
        type: Date,
        default: () => new Date(),
    },

    //describing the exercise completed for the day
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Enter the exercise type',
            },
            name: {
                type: String,
                trim: true,
                required: 'Enter the exercise name',
            },
            duration: {
                type: Number,
                required: 'Enter the duration in minutes',
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
});

//completing and adding the workout to the db
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;