module.exports = (app) => {
    const voteStatus = require('../controllers/voteStatusController');

    app.route('/event/v1/votestatus/:serverip')
    .get(voteStatus.getVoteStatus);

    app.route('/event/v1/votestatus')
    .post(voteStatus.setVoteStatus);
}