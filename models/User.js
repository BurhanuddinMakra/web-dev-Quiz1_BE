const mongoose = require('mongoose');

const userRoles = ['admin', 'user'];
const schema = mongoose.Schema;



const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String,required: true},
    lastName: { type: String ,required: true},
    role: { type: String, enum: userRoles, required: true }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;