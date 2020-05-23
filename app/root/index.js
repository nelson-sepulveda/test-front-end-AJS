'use strict';

angular.module('myApp.index', ['ngRoute' ,'ngMaterial'])
.controller('indexController', 
  ['$mdToast','$http','$location',
  function($mdToast,$http,$location) {
  
  var vm = this;
  
  vm.email = '';
  vm.pass= '';

  vm.submit = functionSubmit;

  init();

  /**
   * Function functionSubmit()
   * Login 
   */
  function functionSubmit() {
    if (vm.email === '' || vm.pass === ''){
      $mdToast.show(
        $mdToast.simple()
        .textContent('Email y Contraseña Invalidos')
        .hideDelay(3000))
    } else {
      const url = `https://dev.tuten.cl:443/TutenREST/rest/user/${vm.email}`;
      var headers = {
        'password':vm.pass,
        'app':'APP_BCK',
        'Accept':'application/json'
      };
      $http({
        method: 'PUT',
        url: url,
        params:{},
        data:{},
        headers: headers
      }).then(function successCallback(response) {
        if (response.status===200){
          var user_data = JSON.stringify(response.data);
          localStorage.setItem('user_data',user_data);
          $location.path("/user-profile");
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Se Presento un error en proceso de la solicitud')
            .hideDelay(3000))
        }
        }, function errorCallback(response) {
          if (response.status===400){
            $mdToast.show(
              $mdToast.simple()
              .textContent(response.data)
              .hideDelay(3000))
          }
        });
    }
  }


  /**
   * function init/()
   */
  function init() {
    var user = localStorage.getItem('user_data');
    user = JSON.parse(user);
    if (user && user.sessionTokenBck){
      $location.path("/user-profile");
    }
  }

}]);