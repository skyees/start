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
 var _ = require('underscore');
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

      console.log('profile:::'+JSON.stringify(profile));

      providerData.accessToken = accessToken;

      providerData.refreshToken = refreshToken;

        FB.setAccessToken(accessToken);

        var Friendslists ='';

        var parents='';

        var picture='';

        var boss_name='';

        var boss='';

        FB.api('/me/friends', function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

            show_results(res);

        });

        function show_results(results) {


            Friendslists = JSON.stringify(results.data,['name']).replace(/'name'/g,'displayName');

            var names = _.pluck(results.data,'name');




            var parents = User.find({ displayName: { $in: names } },null, {sort: {created: 1}}, function(err, cursor) {


                console.log('results::'+ cursor);

                boss = _.pluck(cursor,'email');

                boss_name = _.pluck(cursor,'displayName');

                User.find({displayName:boss_name[0]},'Boss_Name', function(err, Boss_name) {


                    console.log('Super.Boss_Name:result::'+ Boss_name);


                }).stream();

                picture = _.pluck(cursor,'profileImageURL');

                console.log('parent::'+ boss_name);

                console.log('picture::'+ picture);

                console.log('parents::'+ boss);

            }).stream();


            console.log('FriendsList:' + Friendslists);

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
        parents: boss,
        Boss:boss[0],
        Boss_picture:picture[0],
        Boss_Name:boss_name[0],
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
