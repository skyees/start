/**
 * Created by RAJKIRAN on 20-11-2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    AmazonTokenStrategy = require('passport-amazon-token').OAuth2Strategy,
    users = require('../../controllers/users.server.controller');

module.exports = function (config) {
    // Use google strategy
    passport.use(new AmazonTokenStrategy({
            clientID: config.amazon.clientID,
            clientSecret: config.amazon.clientSecret,
            callbackURL: config.amazon.callbackURL,
            passReqToCallback: true
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
                provider: 'google',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};
