'use strict';

angular.module('myApp.flows', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flows', {
    templateUrl: 'flows/flows.html',
    controller: 'FlowsCtrl'
  });
}])

.controller('FlowsCtrl', ['$scope', 'Restangular', '$http', '$location', 'User', '$rootScope', function($scope, Restangular, $http, $location, User, $rootScope) {

    $scope.credentials = {
        username: '',
        password: '',
        groups: '',
        user_permissions: ''
    };
    $scope.showInput = false;
    $scope.siteData = {};
    $scope.siteNumber = 13022500;
    Restangular.all('sites/').getList().then(function (data) {
        $scope.sites = data;
    });
    //13023000
    $scope.login = function() {

        Restangular.all('api-token-auth/').customPOST($scope.credentials).then(function (data) {
            User.info.id = data.id;
            User.info.name = data.name;
            $scope.credentials = {
                username: '',
                password: ''
            };
            $rootScope.$broadcast('user-updated');
            sessionStorage.setItem('User', JSON.stringify(User.info));

        }, function(data) {

            alert ("you are a nice boy")

        });
        $scope.showLogin = false;

    };

    $scope.alerts = [];
    var apiCall = function (siteNumber, doWhat) {
        $http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + siteNumber + "&variable=00060,00065").
        success(function(data) {
        //console.log(data.value.timesSeries[0].sourceInfo.siteName);
            $scope.description = data.value.timeSeries[0].sourceInfo.siteName;
            $scope.siteNumber = data.value.timeSeries[0].sourceInfo.siteCode[0].value;
            $scope.streamFlow = data.value.timeSeries[0].values[0].value[0].value;
            $scope.siteData = {
                description: $scope.description,
                siteNumber: $scope.siteNumber,
                streamFlow: $scope.streamFlow
            };

            if (doWhat == "addSiteToDataBase") {
                var Site = {
                    site: $scope.siteNumber,
                    description: $scope.description
                };

                Restangular.all('add-site/').customPOST(Site).then(function () {

                },
                function () {
                    console.log(Site.description);
                    console.log(Site.site)
                });
            }

        })
        .error(function(data) {

        });

    };
    $scope.getFlows = function (siteNumber) {
        apiCall($scope.siteNumber=siteNumber, "getFlows")
    };
    $scope.addSiteToDataBase = function (siteNumber) {
        $scope.showInput = false;
        apiCall($scope.siteNumber=siteNumber, "addSiteToDataBase")

    };


}])
.factory('User', function() {
    var user = {};
    user.info = {
        id: '',
        name: ''
    };
    return user
});
