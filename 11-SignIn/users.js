const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/users';

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    stuId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    tel: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

usersSchema.statics.authenticate = function(username, password, callback) {
    users.findOne({ username }).exec((err, res) => {
        if (err) return callback(err);
        else if (!res) return callback(null, undefined);
        else return callback(null, res.password === password ? res : null);
    })
}

var users = mongoose.model('Users', usersSchema);
module.exports = users;