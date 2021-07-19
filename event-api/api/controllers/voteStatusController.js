const mongoose = require('mongoose');
const VoteStatus = mongoose.model('VoteStatus');

exports.getVoteStatus = async (req, res) => {
    VoteStatus.findOne({ server: req.params.serverip }, (err, results) => {
        if (err)
            res.json({ success: false, error: err });

        if (!results)
            res.json({ success: false, error: `No server found with the ip: ${req.params.serverip}`});
        else
            res.json({ success: true, serverFound: results });
    });
};

exports.setVoteStatus = async (req, res) => {
    VoteStatus.findOneAndUpdate({ server: req.body.server }, { server: req.body.server, enabled: req.body.enabled, ongoing: req.body.ongoing }, (err, results) => {
        if (err)
            res.send(err);
        else if (results === null || !results) {
            let newServer = new VoteStatus(req.body);
            newServer.save((err, result) => {
                if (err)
                    res.json({ success: false, error: err });

                res.json({ success: true });
            });
        }
        else
            res.json({ success: true });
    });
};