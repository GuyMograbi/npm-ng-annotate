/* global angular */
angular.module('MyModule').service('MyService', function ($scope, AnotherItem) {
  $scope.doSomething = function () {
    AnotherItem.do()
  }
})
