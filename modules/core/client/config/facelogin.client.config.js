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


        var clientId = 'amzn1.application-oa2-client.9d181b1955a94e7d82751a7df1c30a75'; // client ID

        window.onAmazonLoginReady = function() {
            amazon.Login.setClientId(clientId); // set client ID

        };

        document.getElementById('Login').onclick = function() {
            options = { scope : 'profile' };
            amazon.Login.authorize(options, 'https://www.skyees.com/api/amazon/callback');
            return false;
        };

        // Load the facebook SDK asynchronously
        (function(){

            var a = document.createElement('script'); a.type = 'text/javascript';
            a.async = true; a.id = 'amazon-login-sdk';
            a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
            document.getElementById('amazon-root').appendChild(a);


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

