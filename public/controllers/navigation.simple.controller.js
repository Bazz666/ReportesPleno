reportpleno.controller('top_nav_simple_controller', ['$scope','$routeParams','$http','$location','$cookies',
	function top_nav_simple_controller($scope,$routeParams, $http, $location,$cookies){
		$scope.simplenav = { name: 'nav.header.simple.html', url: 'pages/shared/nav.bar.simple.html'}
		
	}
]);