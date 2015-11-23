'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook','$sce',
  function ($scope, Authentication,$facebook,$sce) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

      $scope.yourURL = $sce.trustAsResourceUrl('http://www.amazon.in?_encoding=UTF8&tag=thesmartking-21');

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
