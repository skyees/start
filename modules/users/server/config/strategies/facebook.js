'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
    path = require('path'),
    mongoose = require('mongoose'),
  users = require('../../controllers/users.server.controller');
  var User = mongoose.model('User');
  var FB = require('fb');
  var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

module.exports = function (config) {
  // Use facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
        var iframe = JSON.stringify(profile);
        console.log(JSON.stringify(profile));
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

        FB.setAccessToken(accessToken);

        var Friendslists ='';

        FB.api('/me/friends', function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            var Friends='';

            Friends = JSON.stringify(res.data,["name"]).replace(/name/g,'displayName');

            show_results(res,Friends);

            console.log('FriendsList1:' + Friends);
            console.log('Facebook.id:' + res.data[0].id);
            console.log('Friend.Name:' + res.data[0].name);
        });

        function show_results(results,friend) {

           Friendslists = JSON.stringify(results.data,["name"]).replace(/name/g,'displayName');

            console.log('newFRIENDSlist::'+friend);



            var parent = User.find({
                $or:friend
            });


            var cursor = User.find({$or:friend}, function(err, results) {


                    console.log('results::'+results);

                });

            });

            console.log("parent::"+ cursor);


            cursor.exec(function (err, person) {
                if (err) {
                    console.log("parent error"+errorHandler.getErrorMessage(err));
                    return errorHandler.getErrorMessage(err);
                }
                console.log('person:::%s .',person); // Space Ghost is a talk show host.
            });


          }

    setTimeout(function(){
      // Create the user OAuth profile
      var providerUserProfile = {
        id:profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : undefined,
        username: profile.username || generateUsername(profile),
        profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
        provider: 'facebook',
        friends:Friendslists,
        providerIdentifierField:'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);

    },Math.random() * 2000);

      function generateUsername(profile) {
        var username = '';

        if (profile.emails) {
          username = profile.emails[0].value.split('@')[0];
        } else if (profile.name) {
          username = profile.name.givenName[0] + profile.name.familyName;
        }

        return username.toLowerCase() || undefined;
      }
    }
  ));
};
