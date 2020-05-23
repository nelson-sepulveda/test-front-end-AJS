'use strict';

angular.module('myApp.view1', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('View1Ctrl', ['$location' ,function($location) {
  console.log('HOLAA DESDE VIEW 1');

  init()

  function init() {
    // $location.path("/view2");
  }

}]);