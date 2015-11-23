'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook',
  function ($scope, Authentication,$facebook) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

      $scope.yourURL='http://www.amazon.in?_encoding=UTF8&tag=thesmartking-21';

      $scope.loadFriends = function() {
          $facebook.api("/864549880333392/friends").then(
              function(response) {
                  $scope.myFriends = response.data;
              },
              function(err) {
                  $scope.myFriends = "Please log in";
              });
      };
  }
]);
