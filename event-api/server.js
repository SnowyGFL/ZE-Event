// GET request to get the current event status... false = no event vote ongoing, true = event vote ongoing
// POST request to update the event status (admin will use commands in-game or in discord to start/stop event votes)
// POST request to add the map into the mongoDB collection once a user has voted the map. (If the map exist, increment the vote count)

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const morgan = require('morgan');

// MongoDB related stuffs
VoteStatus = require('./api/models/voteStatusModel');
MapVote = require('./api/models/mapVoteModel');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then (res => {
                console.log("Connected to MongoDB!");
            })
            .catch (err => {
                console.log(Error, err.message);
            });

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use("/event/v1", verifyAPIKey, (req, res, next) => {
    next();
});

function verifyAPIKey (req, res, next) {
    var headers = req.headers[process.env.HEADER];
    if (typeof headers !== 'undefined') {
        if (headers === process.env.APIKEY)
            next();
        else
            res.status(401).json({ success: false, error: "Unauthorized Usage of API" });
    }
    else
        res.status(401).json({ success: false, error: "Unauthorized Usage of API" });
}

// Routes
const voteStatus = require('./api/routes/getVoteStatusRoute');
voteStatus(app);

const mapVote = require('./api/routes/mapVoteRoute');
mapVote(app);


app.listen(port, () => console.log(`EventAPI started and listening on port ${port}`));