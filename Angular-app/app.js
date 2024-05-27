var myPlayerzApp = angular.module('myPlayerzApp', ['ngRoute', 'ngAnimate']);

myPlayerzApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'myPlayerzController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'myPlayerzController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

myPlayerzApp.directive('randomPlayer', [function() {
    return {
        restrict: 'E',
        scope: {
            players: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

angular.module('myPlayerzApp').controller('myPlayerzController', ['$scope', '$http' ,function($scope, $http) {

    $scope.removePlayer = function(player) {
        var removedPlayer = $scope.players.indexOf(player);
        $scope.players.splice(removedPlayer, 1);
    }

    $scope.addPlayer = function() {
        $scope.players.push({
            name: $scope.newPlayer.name,
            team: $scope.newPlayer.team,
            goals: $scope.newPlayer.goals,
            salary: $scope.newPlayer.salary
        });

        $scope.newPlayer.name = "";
        $scope.newPlayer.team = "";
        $scope.newPlayer.goals = "";
        $scope.newPlayer.salary = "";
    };

    $scope.removeAllPlayers = function() {
        $scope.players = [];
    };

    $http.get('data/players.json').then(function(response) {
        $scope.players = response.data;
    }, function(error) {
        console.error('Error occurred:', error);
    });


}]);

myPlayerzApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {
    $scope.sendMessage = function() {
        $location.path('/contact-success');
    };
}]);