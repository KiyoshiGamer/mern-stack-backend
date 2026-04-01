// use mongoose Schema here
// Schema is for structuring the data for mongoDB

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create an object
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type:String,
        required: true
    }
// automatically adds createdAt and updatedAt fields.
}, { timestamps: true })

// export the module
module.exports = mongoose.model('workout', workoutSchema )

