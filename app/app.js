'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.index',
  'myApp.profile',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngMaterial'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  // $routeProvider.otherwise({redirectTo: '/view1'});
  $routeProvider
  .when('/', {
    templateUrl :'root/index.html',
    controller  : 'indexController',
    controllerAs:'indexController'
  })
  .when('/user-profile', {
    templateUrl :'profile/profile.html',
    controller  : 'profileController',
    controllerAs:'profileController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
