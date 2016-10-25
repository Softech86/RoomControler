/**
 * Created by leobai on 16/8/26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User schema
var MessageSchema = new Schema({
    userName: String,
    content: String,
    createTimestamp: String
});

// export them
exports.Message = mongoose.model('Message', MessageSchema);
