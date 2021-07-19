const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteStatusSchema = new Schema({
    server: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
    ongoing: {
        type: Boolean,
        required: true
    }
}, { collection: 'VoteStatus', versionKey: false });

module.exports = mongoose.model('VoteStatus', VoteStatusSchema);