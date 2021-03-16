const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [
        {
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
        },
        duration: { 
            type: Number,
            required: "How long before you drop dead?"
        }
    }
    
        
            // type: Schema.Types.ObjectId,
            // ref: "Exercise",
        // }
    ]
},
    {
        toJSON: {
          // include any virtual properties when data is requested
          virtuals: true
        }
      }
)



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;