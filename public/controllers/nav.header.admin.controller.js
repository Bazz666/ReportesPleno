reportpleno.controller('navHeaderAdm', ['$scope','$location', function($scope, $location) {
    
    $scope.logout = () => {
        
        localStorage.clear();
        $location.path('/');

    };
}]);