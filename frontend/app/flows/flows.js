'use strict';

angular.module('myApp.flows', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flows', {
    templateUrl: 'flows/flows.html',
    controller: 'FlowsCtrl'
  });
}])

.controller('FlowsCtrl', ['$scope', 'Restangular', '$http', function($scope, Restangular, $http) {
    $scope.showCfsWhenScreenIsSmall = window.innerWidth < 1000 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $scope.showInput = false;
    $scope.siteData = [];
    $scope.siteNumber = 13022500;

    Restangular.all('sites/').getList().then(function (data) {
        $scope.sites = data;
        $scope.sites.flow = '';
        for (var i = 0; i < $scope.sites.length; i++) {
            $http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + $scope.sites[i].site + "&variable=00060,00065").
            success(function (data) {
                assignFlows(data)
            });

        }

    });
    var assignFlows = function(siteInfo){
        $scope.description = siteInfo.value.timeSeries[0].sourceInfo.siteName;
        $scope.siteNumber = siteInfo.value.timeSeries[0].sourceInfo.siteCode[0].value;
        $scope.streamFlow = siteInfo.value.timeSeries[0].values[0].value[0].value;
        $scope.currentSiteData = {
            description: $scope.description,
            siteNumber: $scope.siteNumber,
            streamFlow: $scope.streamFlow
        };
        $scope.siteData.push($scope.currentSiteData);

    };
    var addSiteToList = function() {
        $scope.hideLastButton = false
    };
    var apiCall = function (siteNumber) {
        $http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + siteNumber + "&variable=00060,00065").
            success(function(data) {
                assignFlows(data);
                var Site = {
                    site: $scope.siteNumber,
                    description: $scope.description
                };
                Restangular.all('add-site/').customPOST(Site).then(function () {},
            function () {
                console.log(Site.description);
                console.log(Site.site)
            });
            addSiteToList()
        })
        .error(function(data) {});
    };
    $scope.addSiteToDataBase = function (siteNumber) {
        $scope.showInput = false;
        apiCall($scope.siteNumber=siteNumber)
    };
}]);
