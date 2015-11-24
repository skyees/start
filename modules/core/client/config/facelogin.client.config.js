'use strict';

// Core module config

angular.module('core')
    .config(['$facebookProvider',
        function($facebookProvider)
        {
            $facebookProvider.setAppId('1664525490499797');
            $facebookProvider.setPermissions('email,user_likes,friends');
            $facebookProvider.setCustomInit({
                xfbml: true

            });




        }
    ]).run( function( $rootScope ) {




        // Load the facebook SDK asynchronously
          (function(){


              window.onload = function() {
                  document.getElementById('Login').onclick = function () {
                      setTimeout(window.doLogin, 1);
                      return false;
                  };
                  window.doLogin = function () {
                      var options = {};
                      options.scope = 'profile';
                      amazon.Login.authorize(options, function (response) {
                          if (response.error) {
                              alert('oauth error ' + response.error);
                              return;
                          }
                          amazon.Login.retrieveProfile(response.access_token, function (response) {
                              alert('Hello, ' + response.profile.Name);
                              alert('Your e-mail address is ' + response.profile.PrimaryEmail);
                              alert('Your unique ID is ' + response.profile.CustomerId);
                              if (window.console && window.console.log)
                                  window.console.log(response);
                          });
                      });
                  };


                               };


              var a = document.createElement('script'); a.type = 'text/javascript';
              a.async = true; a.id = 'amazon-login-sdk';
              a.src = 'https://api-cdn.amazon.com/sdk/login1.js';


            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = '//connect.facebook.net/en_US/all.js';

            // Insert the Facebook JS SDK
            firstScriptElement.parentNode.insertBefore(a, firstScriptElement);
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    });

