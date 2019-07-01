
const friendsData = require("../data/friends.js");


module.exports = (app) => {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

    app.get("/api/friends", (req, res) => {
        res.json(friendsData);
    });

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", (req, res) => {
        var userData = req.body;
        var userScores = userData.scores;
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: Infinity
        }
        var totaldiff;
        for (var i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i];
            totaldiff = 0;
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totaldiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }
            if (totaldiff <= bestMatch.friendDiff) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = totaldiff;
            }
        }
        friendsData.push(userData);
        res.json(bestMatch);
    });
}


