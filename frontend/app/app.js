'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.flows',
    'myApp.User',
    'ui.bootstrap',
    'myApp.version',
    'restangular'
])
.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
    $routeProvider.otherwise({redirectTo: '/flows'});

    RestangularProvider.setBaseUrl('http://localhost:8001')
}])
.controller('AppCtrl', function ($scope, User, $location, $http) {


    if (sessionStorage.getItem('DjangoAuthToken')){
        var token = sessionStorage.getItem('DjangoAuthToken');
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        User.getInfo().then(function(){
            $scope.user = User.info;
        });
    }

    if (User.info.id == '') {
    }

    $scope.logout = function() {
        User.info = {
            id: '',
            name: ''
        };
        $scope.user = null;
        sessionStorage.clear();
    };

    $scope.$on("user-updated", function() {
        $scope.user = User.info;
    });

    $scope.$on('$routeChangeStart', function() {
        if ((User.info != null && User.info.id == '') || User.info == null){
        }
    });

});

var baseURL = 'http://localhost:8001/';

