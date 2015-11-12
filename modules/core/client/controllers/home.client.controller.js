'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebookProvider',
  function ($scope, Authentication,$facebookProvider) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
      $scope.loadFriends = function() {
          $facebook.api('/me/friends', function(response) {
              $scope.$apply(function() {
                  $scope.myFriends = response.data;
                  console.log($scope.myFriends);
              });

          });
      };
  }
]);
