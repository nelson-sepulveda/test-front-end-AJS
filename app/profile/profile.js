'use strict';

angular.module('myApp.profile', ['ngRoute','ngMaterial'])

.controller('profileController', 
  ['$location','$http', '$mdToast'
  ,function($location,$http,$mdToast) {
  console.log('HOLAA DESDE profile');

  var vm = this;

  vm.user = {};
  vm.isLoader = true
  vm.listBooks = []
  vm.search = {
    selectedItem:'',
    searchText:''
  };
  vm.querySearch = querySearch;
  vm.logOut = logOut;

  init();
  loaderBooks();

  function init() {
    var user = localStorage.getItem('user_data');
    user = JSON.parse(user);
    if (!user || !user.sessionTokenBck){
      $location.path("/");
    }
    vm.user = user;
  }

  function querySearch() {
    
  }

  function logOut() {
    localStorage.removeItem('user_data');
    $location.path("/");
  }

  function loaderBooks() {
    var url = 'https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true';
    var headers_ = {
      'app'        :'APP_BCK',
      'adminemail' : vm.user.email,
      'token'      : vm.user.sessionTokenBck,
      'Accept'     : 'application/json'
    };

    $http({
      method: 'GET',
      url: url,
      params:{},
      data:{},
      headers: headers_
    }).then( function success(response){
      vm.isLoader = !vm.isLoader;
      if (response && response.status===200){
        // vm.listBooks = response.data;
        converterFecha(response.data)
        console.log(moment(vm.listBooks[0].parentBooking.bookingCreatedTime).format("MMM-DD-YYYY"))
        $mdToast.show(
          $mdToast.simple()
          .textContent('Carga Correcta de Libros')
          .hideDelay(3000))
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Se presento un error en la carga de libros')
          .hideDelay(3000))
      }
    },function error(response){
      vm.isLoader = !vm.isLoader;
      $mdToast.show(
        $mdToast.simple()
        .textContent('Se presento un error en la carga de libros')
        .hideDelay(3000))
    })
  }

  function converterFecha(books){
    books.forEach(book => {
      if (book.parentBooking && book.parentBooking.bookingCreatedTime) {
        book.parentBooking.bookingCreatedTime = moment(book.parentBooking.bookingCreatedTime).format('MMM-DD-YYYY')
      }
    });
    vm.listBooks = books;
  }

}]);