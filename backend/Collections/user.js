let mongo = require("mongoose");

let user_model = mongo.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        default:"Pakistan"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongo.model("User",user_model);