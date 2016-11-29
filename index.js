var request = require("request");
var Q = require("q");
var R = require('ramda');

require('dotenv').config();

/* eslint-disable no-console */

var getUsers = function (allUsers = [], perPage, pageNumber) {
  var deferred = Q.defer();
  var options = {
    method: 'GET',
    url: process.env.V2_ENDPOINT_URL + 'users',
    qs: { per_page: perPage, page: pageNumber, fields: 'user_id', include_fields: 'true' },
    headers: {
      'cache-control': 'no-cache',
      authorization: 'Bearer ' + process.env.MANAGEMENT_TOKEN
    }
  };
  request(options, function (error, response, body) {
    if (error) {
      return deferred.reject(new Error(error));
    }
    var newUsers = JSON.parse(body);
    // UNCOMMENT FOR DEV ONLY WITH MOCK API - choose a number to get pagination
    // if (newUsers.length > 0 && (allUsers.length + newUsers.length) < 301) {
    if (newUsers.length > 0) {
      allUsers = R.concat(allUsers, newUsers);
      return deferred.resolve(getUsers(allUsers, perPage, pageNumber + 1));
    }
    return deferred.resolve(allUsers);
  });
  return deferred.promise;
};

var deleteUser = function (user) {
  var deferred = Q.defer();
  // UNCOMMENT FOR DEV ONLY WITH MOCK API
  // var userId = user.id;
  var userId = user.user_id;
  var options = {
    method: 'DELETE',
    url: process.env.V2_ENDPOINT_URL + 'users/' + userId,
    headers: {
      'cache-control': 'no-cache',
      authorization: 'Bearer ' + process.env.MANAGEMENT_TOKEN
    }
  };
  request(options, function (error, response, body ) {
    if (error) {
      return deferred.reject(new Error(error));
    }
    console.log(body);
    console.log('Delete completed for: ' + userId);
    return deferred.resolve();
  });
  return deferred.promise;
}

getUsers([], 100, 0).then(function (users) {
  console.log('Total number of users: ' + users.length);
  console.log('RESULT: ' + JSON.stringify(users));
  var totalUsers = users.length;

  if (totalUsers > 0) {
    var deletePromises = R.map(deleteUser, users);
    Q.allSettled(deletePromises)
    .then(function (results) {
      var succeeded = 0;
      var failed = 0;
        results.forEach(function (result) {
            if (result.state === "fulfilled") {
              succeeded += 1;
            } else {
              failed += 1;
            }
        });
        console.log('Total users: ' + totalUsers);
        console.log('Total deleted: ' + succeeded);
        console.log('Total failed to delete: ' + failed);
    });
  }

}, function (err) {
  console.log('ERROR: ' + err);
});


