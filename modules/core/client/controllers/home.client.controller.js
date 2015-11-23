'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook','$sce',
  function ($scope, Authentication,$facebook, $sce) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
      $scope.urls = [];
      $scope.urls.push({domain: $sce.trustAsResourceUrl("http://angularjs.org")});
      $scope.yourURL = $sce.trustAsResourceUrl('https://www.amazon.in/');

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
