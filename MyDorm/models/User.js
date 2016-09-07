/**
 * Created by leobai on 16/8/26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User schema
var UserSchema = new Schema({
    email: String,
    name: String,
    id: String,
    password: String
});

// export them
exports.User = mongoose.model('User', UserSchema);
