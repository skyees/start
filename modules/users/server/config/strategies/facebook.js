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


            var Friends = JSON.stringify(res.data,["name"]).replace(/name/g,'displayName');

            show_results(res,Friends);
            var names_1 =[];


            var big = _.map( res.data, function( o ) {
                return { name: o.name, id: o.id };
            });

            names_1 = _.pluck(res.data, 'name');

            var b_result = [];

            for( var i = 0, n = res.data.length;  i < n;  ++i ) {
                var o = res.data[i];
                b_result.push ({ name: o.name, id: o.id });
            }
            var raj=[];

            raj = toArray(res.data);

            function toArray(obj) {
                var result = [];
                for (var prop in obj) {
                    var value = obj[prop];
                    if (typeof value === 'object') {
                        result.push(toArray(value)); // <- recursive call
                    }
                    else {
                        result.push(value);
                    }
                }
                return result;
            }

            var arr = Object.keys(res.data).map(function(k) { return res.data[k];});

            console.log('FriendsList1:' + Friends);
            console.log('Facebook.bigresult:' + big);
            console.log('Friend.b_result:' + b_result);
            console.log('Friends.arr:' + arr);
            console.log('Friends.arr:raj:' + raj);

        });

        function show_results(results,friend) {
            var Friendslist=[];

           Friendslists = JSON.stringify(results.data,["name"]).replace(/name/g,'displayName');

            var myObject = JSON.parse(Friendslists);

            Friendslist = JSON.stringify(results.data);
            console.log('newFRIENDSlist0::'+myObject[0]);
            console.log('newFRIENDSlist::'+myObject);


            var myArray = [];
            var arrays=[];
            for(var indexs in myObject) {
                myArray.push(myObject[indexs]);
                for(var ind in myObject[0]) {
                    arrays.push(myArray[ind]);

                }

            }

           var names = _.pluck(results.data,'name');
            var f_ids = _.pluck(results.data,'id');

            console.log('myArray::'+names);
            console.log('myArray::'+myArray);

            var result = [];
            for(var i in Friendslists) {
                result.push(Friendslists[i]);
            }
            console.log('f_ids:::'+f_ids);

            console.log('result1:::'+result);

           var cache=[];

            var cursor = User.find({ displayName: { $in: names } },null, {sort: {created: -1}}, function(err, cursor) {

                console.log('results::'+ cursor);


            }).stream();





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
