'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook',
  function ($scope, Authentication,$facebook) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
      $scope.loadFriends = function() {
          $facebook.api("/me/friends").then(
              function(response) {
                  $scope.myFriends = "Welcome " +response.data[0];
              },
              function(err) {
                  $scope.myFriends = "Please log in";
              });
      };
  }
]);
