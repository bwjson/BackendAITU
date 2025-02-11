const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("mongoose connect successfully!");
    })
    .catch(e => {
        console.error("Error: " + e);
    })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to user model
        ref: 'Users',
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})

const User = mongoose.model('Users', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account }