const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapVoteSchema = new Schema({
    mapname: {
        type: String,
        required: true
    },
    playerId: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    }
}, { collection: 'MapVotes', versionKey: false });

module.exports = mongoose.model('MapVote', MapVoteSchema);