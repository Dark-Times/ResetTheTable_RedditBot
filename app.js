require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'Dark-Times.ResetTheTable_RedditBot:v1.0.0',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    //subreddit: 'testingground4bots',
    subreddit: 'all',
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On flippy, no flippy
if(!('contains' in String.prototype)) {
    String.prototype.contains = function(str, startIndex) {
             return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
}

comments.on('comment', (comment) => {
    var commentBody = comment.body.toString();
    if (commentBody.contains("(╯°□°）╯︵ ┻━┻")) {
        comment.reply('┬──┬ ︵ ノ(°-°ノ)');
    }
});