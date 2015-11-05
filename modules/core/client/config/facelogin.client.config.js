'use strict';

// Core module config

angular.module('core')
    .config(['$facebookProvider',
        function($facebookProvider)
        {
            $facebookProvider.setAppId('312563625534623');
            $facebookProvider.setPermissions('email,user_likes,friends');
            $facebookProvider.setCustomInit({
                xfbml: true
            });
        }
    ]);

