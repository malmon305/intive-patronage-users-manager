var usersJson  = require('./users.json');
var hobbiesJson  = require('./hobbies.json');

module.exports = function() {
    return {
        users  : usersJson,
        hobbies : hobbiesJson,
    }
}