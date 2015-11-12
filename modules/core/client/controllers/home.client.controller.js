'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook',
  function ($scope, Authentication,$facebook) {
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
