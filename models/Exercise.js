const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        required: "Exercise type required",
    },
    name: {
         type: String,
         required: "Exercise name required",
    },
    duration: {
        type: Number,
        required: "Duration required",
    },
    weight: {
        type: Number,
        required: "Weight required",
    },
    reps: {
        type: Number,
        required: "How many reps???"
    },
    sets: {
        type: Number,
        required: "How many sets are you gonna do before I come for you?"
    }
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;