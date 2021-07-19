module.exports = (app) => {
    const mapVote = require('../controllers/mapVoteController');

    app.route('/event/v1/votemap')
        .post(mapVote.voteForMap)

    app.route('/event/v1/votemap/:playerid/:server')
        .get(mapVote.getPlayerVote);

    app.route('/event/v1/listvotes/:server')
        .get(mapVote.getVoteList);

    app.route('/event/v1/deletevotes/:server')
        .delete(mapVote.deleteAllVotesFromServer);
}