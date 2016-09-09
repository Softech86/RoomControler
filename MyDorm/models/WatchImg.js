/**
 * Created by leobai on 16/8/26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User schema
var WatchImgSchema = new Schema({
    fileName: String,
    CreateTimestamp: Date
});

// export them
exports.WatchImg = mongoose.model('WatchImg', WatchImgSchema);
