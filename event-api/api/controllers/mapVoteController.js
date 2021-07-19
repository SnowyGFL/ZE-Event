const mongoose = require('mongoose');
const MapVote = mongoose.model('MapVote');
const VoteStatus = mongoose.model('VoteStatus');

exports.voteForMap = async (req, res) => {
    var serverFound = await VoteStatus.findOne({ server: req.body.server });
    if (serverFound === null || !serverFound)
        return res.json({ success: false, error: "Server is not registered in the database"});
    else if (serverFound.ongoing === false)
        return res.json({ success: false, error: "Server has not started a map vote"});

    var playerFound = await MapVote.findOne({ playerId: req.body.playerId, server: req.body.server });

    // If player not found, add it into the db, else update the record.
    if (playerFound === null || !playerFound) {
        let newVote = new MapVote(req.body);
        newVote.save((err, result) => {
            if (err)
                res.json({ success: false, error: err });
            else
                res.json({ success: true, result: result, id: result.id });
        });
    }
    else {
        await MapVote.findByIdAndUpdate(playerFound._id, { mapname: req.body.mapname, playerId: req.body.playerId, server: req.body.server }, { new: true }).then((result) => {
            res.json({ success: true, result: result, id: result.id });
        })
        .catch (err => {
            res.json({ success: false, error: err });
        })
    }
};

exports.getPlayerVote = async (req, res) => {
    MapVote.findOne({ playerId: req.params.playerid, server: req.params.server }, (err, result) => {
        if (err)
            res.json({ success: false, error: err });
        else if (!result)
            res.json({ success: true, found: false });
        else
            res.json({ success: true, found: true, result: result });
    });
}

exports.deleteAllVotesFromServer = async (req, res) => {
    MapVote.deleteMany({ server: req.params.server }, (err, results) => {
        if (err)
            res.json({ success: false, error: err });
        else
            res.json({ success: true });
    });
}

exports.getVoteList = async (req, res) => {

}