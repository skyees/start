'use strict';


var passport = require('passport'),
    AmazonStrategy = require('passport-amazon').Strategy,
    users = require('../../controllers/users.server.controller');

module.exports = function (config) {
    // Use google strategy
    passport.use(new AmazonStrategy({
            clientID: config.amazon.clientID,
            clientSecret: config.amazon.clientSecret,
            callbackURL: config.amazon.callbackURL
                    },
        function (req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                profileImageURL: (providerData.picture) ? providerData.picture : undefined,
                provider: 'amazon',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};
