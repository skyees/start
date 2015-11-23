'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook','$sce',
  function ($scope, Authentication,$facebook, $sce) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

      $scope.urls = $sce.trustAsResourceUrl('http://amazon.in')+ "&output=embed";
      $scope.yourURL = $sce.trustAsResourceUrl('https://angularjs.org');

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
