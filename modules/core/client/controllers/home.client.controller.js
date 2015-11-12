'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook',
  function ($scope, Authentication,$facebook) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
      $scope.loadFriends = function() {
          $facebook.api("/me").then(
              function(response) {
                  $scope.myFriends = "Welcome " + response.name;
              },
              function(err) {
                  $scope.myFriends = "Please log in";
              });
      };
  }
]);
