'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.flows',
    'ui.bootstrap',
    'myApp.version',
    'restangular'


]).

    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/flows'});

        RestangularProvider.setBaseUrl('/api')
    }]);
