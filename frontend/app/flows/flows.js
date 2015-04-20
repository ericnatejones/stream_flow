'use strict';

angular.module('myApp.flows', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flows', {
    templateUrl: 'flows/flows.html',
    controller: 'FlowsCtrl'
  });
}])

.controller('FlowsCtrl', ['$scope', 'Restangular', '$http', function($scope, Restangular, $http) {
    $scope.showInput = false
    $scope.siteData = {};
    $scope.siteNumber = 13022500;
    Restangular.all('sites/').getList().then(function (data) {
        $scope.sites = data;
    });
    //13023000
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
        apiCall($scope.siteNumber=siteNumber, "addSiteToDataBase")
    };

}]);