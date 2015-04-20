'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.flows',
    'myApp.view2',
    'myApp.version',
    'restangular'


]).

    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/flows'});

        RestangularProvider.setBaseUrl('http://localhost:8001')
    }]);
