'use strict';

angular.module('myApp.flows', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flows', {
    templateUrl: 'flows/flows.html',
    controller: 'FlowsCtrl'
  });
}])

.controller('FlowsCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.showCfsWhenScreenIsSmall = window.innerWidth < 1000 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $scope.siteData = [];
    $scope.siteNumber = 13022500;
    var problemWithLoggingIn = "";
    var problemWithRegistration = "";
    $scope.currentFavorites = [];
    $scope.siteForEdit = [];
    $scope.user = {
        username: '',
        password: ''
    };
    var userToBe = {};
    $scope.isFlowInParameters = function (site) {
        return site.lowerParameter < site.streamFlow && site.streamFlow < site.upperParameter
    };

    $http.get(api+'accounts/').success(function (accounts) {
        $scope.accounts = accounts;
    });
    $scope.authenticate = function (username, password) {

        for ( var num = 0; num < $scope.sites.length; num++) {
            for (var number = 0; number <$scope.siteData.length; number++){
                if ($scope.siteData[number].description == $scope.sites[num].description){
                       $scope.siteData[number].id  = $scope.sites[num].id
                }
            }
            for (number = 0; number <$scope.currentFavorites.length; number++) {
                if ($scope.currentFavorites[number].description == $scope.sites[num].description){
                       $scope.currentFavorites[number].id  = $scope.sites[num].id
                }
            }

        }


        for(var i = 0; i < $scope.accounts.length; i++) {
            if ($scope.accounts[i].username == username) {
                if ($scope.accounts[i].password == password) {
                    $scope.user = $scope.accounts[i];
                    problemWithLoggingIn = "";
                    $scope.showLogin = false;
                    break;
                } else {
                    problemWithLoggingIn = "wrong password, buddy";
                    break;
                }
            } else {
                problemWithLoggingIn = "User does not exist"
            }
        }
        if (problemWithLoggingIn == ""){
            toastr.info("good login")
        } else {
            toastr.warning (problemWithLoggingIn)
        }
        //for (i = 0; i < $scope.sites.length; i++){
        //}
        $scope.loadParametersAndAssociatedAccountsAndSites(username)
    };
    $scope.loadParametersAndAssociatedAccountsAndSites = function (username) {
        $http.get(api+'everything/').success(function (parameterInfo) {
            $scope.parameterInfo = parameterInfo;
            for (var i=0; i<$scope.parameterInfo.length; i++) {
                if ($scope.parameterInfo[i].username == username){
                    for (var iterSite = 0; iterSite<$scope.parameterInfo[i].sites.length; iterSite++) {
                            console.log($scope.parameterInfo[i].sites[iterSite].upper_parameter);
                        $scope.favorite($scope.parameterInfo[i].sites[iterSite].site.description,
                                        $scope.parameterInfo[i].sites[iterSite].lower_parameter,
                                        $scope.parameterInfo[i].sites[iterSite].upper_parameter );
                    }

                }

            }

        });
    };

    $scope.addAccount = function () {
        problemWithRegistration = "";
        if ($scope.username) {
            for(var i = 0; i<$scope.accounts.length; i++){
                if ($scope.accounts[i].username == $scope.username){
                    problemWithRegistration = "user already exists"
                }
            }
        } else {
            problemWithRegistration = "please enter a username and password"
        }

        if (problemWithRegistration == "") {
            if ($scope.password.length < 4) {
                var Account = {
                    username: $scope.username,
                    password: $scope.password

                };
                $http.post(api+'add-account/', Account).success(function () {
                        $scope.showLogin = false;
                        $scope.user = Account;
                        $scope.accounts.push(Account);
                        toastr.info("You sir, were added as a user. ")
                    },
                    function () {
                        console.log(Account.username);
                        console.log(Account.password)
                    });
            } else {
                alert("keep password 3 characters or less. Are you concerned that it won't be secure? It won't! " +
                "We suggest using your initials, the day of the month you were born, or the letter 'a'. " +
                "Your password wont be kept a secret, everyone will be able to find it. So what? They will " +
                "know what your favorite rivers are? Get over it. ")
            }
        } else {
            toastr.warning(problemWithRegistration);
        }
    };
    $scope.logout = function () {
        userToBe = {
            id: $scope.user.id,
            username: $scope.user.username,
            password: $scope.user.password

        };
        $scope.accounts.push(userToBe);

        $scope.user.username = '';
        $scope.user.password = '';

        for (var i =0; i <  $scope.currentFavorites.length; i++){
            $scope.removeFavorite($scope.currentFavorites[i].description)
        }
    };
    $http.get(api+'sites/').success(function (data) {
        $scope.sites = data;

        for (var i = 0; i < $scope.sites.length; i++) {
            $scope.currentSiteData = {
                description: $scope.sites[i].description,
                siteNumber: $scope.sites[i].site,
                streamFlow: 0,
                lowerParameter: '',
                upperParameter: '',
                id: $scope.sites[i].id
            };
            $scope.id = $scope.sites[i].id
            $http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + $scope.sites[i].site + "&variable=00060,00065").
            success(function (data) {
                assignFlows(data, i)
            });
        }

    });
    var assignFlows = function(siteInfo){

        $scope.currentSiteData = {
            description: siteInfo.value.timeSeries[0].sourceInfo.siteName,
            siteNumber: siteInfo.value.timeSeries[0].sourceInfo.siteCode[0].value,
            streamFlow: parseInt(siteInfo.value.timeSeries[0].values[0].value[0].value),
            lowerParameter: '',
            upperParameter: '',
            id: ''
        };
        $scope.siteData.push($scope.currentSiteData);

    };
    var apiCall = function (siteNumber) {
        $http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + siteNumber + "&variable=00060,00065").
            success(function(data) {
                assignFlows(data);
                var Site = {
                    site: $scope.siteNumber,
                    description: $scope.currentSiteData.description,
                    favorited_by: $scope.user.username
                };
                $http.post(api+'add-site/', Site).success(function () {},
            function () {
                console.log(Site.description);
                console.log(Site.site)
            });
        })
        .error(function(data) {});
    };
    $scope.addSiteToDataBase = function (siteNumber) {
        $scope.showInput = false;
        apiCall($scope.siteNumber=siteNumber);
    };
    $scope.favorite = function (site, lowerParameter, upperParameter){
        if ($scope.user.username){
            for(var i = 0; i < $scope.siteData.length; i++) {
                if ($scope.siteData[i].description == site) {
                    $scope.currentFavorites.push($scope.siteData[i]);
                    for (var iterFavs=0; iterFavs<$scope.currentFavorites.length; iterFavs++){
                        if ($scope.currentFavorites[iterFavs].description == site){
                            $scope.currentFavorites[iterFavs].lowerParameter = lowerParameter;
                            $scope.currentFavorites[iterFavs].upperParameter = upperParameter;
                        }
                    }
                    for(var n = 0; n < $scope.sites.length; n++){
                        if (site == $scope.sites[n].description) {
                            $scope.sites[n].favorited_by.push($scope.user.id);
                            $http.put(api+'update-site/' + $scope.sites[n].id, $scope.sites[n])

                        }
                    }
                    $scope.siteData.splice(i, 1);
                    break;
                }
            }

        } else {
            toastr.warning("log in to favorite a site")
        }


    };
    $scope.removeFavorite = function (site){
        for(var i = 0; i < $scope.currentFavorites.length; i++) {
            if ($scope.currentFavorites[i].description === site) {
                $scope.siteData.push($scope.currentFavorites[i]);
                for(var n = 0; n < $scope.sites.length; n++){
                    if (site == $scope.sites[n].description) {
                        $scope.sites[n].favorited_by.pop($scope.user.id);
                        $http.put(api+'update-site/' + $scope.sites[n].id, $scope.sites[n])

                    }
                }
                $scope.currentFavorites.splice(i, 1);
                break;
            }
        }
    };

}]);