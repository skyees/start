'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;



   // Update a user profile
      $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };

   // GET a user BOSS

      $scope.getBoss = function () {
          $scope.success = $scope.error = null;

          $http.get('/api/users/boss', {
              params: {
                  boss: Authentication.user.displayName
              }
          }).success(function (response) {
              // If successful show success message and clear form
              $scope.success = true;
              $scope.boss = response;

          }).error(function (response) {
              $scope.error = response.message;
          });
      };

      $scope.getSuperBoss = function () {
          $scope.success = $scope.error = null;

          $scope.superBosss = 'RAJKIRAN';

          $http.get('/api/users/superBoss', {
              params: {
                  Sboss: Authentication.user.displayName
              }
          }).success(function (response) {
              // If successful show success message and clear form
              $scope.success = true;
              $scope.superBoss = response;

          }).error(function (response) {
              $scope.error = response.message;
          });
      };










  }
]);
