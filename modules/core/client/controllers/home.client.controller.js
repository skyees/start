'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$facebook','$sce','$http',
  function ($scope, Authentication,$facebook, $sce,$http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

      $scope.urls = $sce.trustAsResourceUrl('https://amazon.in');
      $scope.yourURL = $sce.trustAsResourceUrl('https://angularjs.org');
      $scope.amazonApi=function(){

          $http({
              method: 'GET',
              url: '/amazon'
          }).then(function successCallback(response) {
              alert('goodRajkiran');
          }, function errorCallback(response) {
              alert('badRajkiran');
              // called asynchronously if an error occurs
          });

      };

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
