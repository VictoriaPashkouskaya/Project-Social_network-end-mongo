const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true }, 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const userSchema2 = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
});

module.exports = mongoose.model('User', userSchema);