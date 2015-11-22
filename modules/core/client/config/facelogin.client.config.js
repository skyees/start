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

        var s3 = null;
        var clientId = 'amzn1.application-oa2-client.22c245e8e0d5419a87c7a287e5f9c727'; // client ID

        window.onAmazonLoginReady = function() {
            amazon.Login.setClientId(clientId); // set client ID

            document.getElementById('login').onclick = function() {

                amazon.Login.authorize({scope:'profile'}, function(response) {

                    if (!response.error) { // logged in

                        amazon.Login.retrieveProfile(response.access_token, function(response) {

                            alert(JSON.stringify(response.profile.Name));
                            alert(response.profile.Name);

                             console.log('You are now logged in.');

                        });

                         console.log('You are now logged in.');
                    } else {
                        console.log('There was a problem logging you in.');
                    }
                });
            };
        };
        // Load the facebook SDK asynchronously
        (function(){

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

