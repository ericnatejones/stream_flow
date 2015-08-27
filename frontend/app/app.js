'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.flows',
    'ui.bootstrap',
    'myApp.version'


]).

    config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/flows'});
    }]);

var api = "http://localhost:8001/";
