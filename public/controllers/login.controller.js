reportpleno.controller('loginController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function loginController($scope,$routeParams, $http, $location,$cookies, httpService){
		
        
        $scope.login = function(){
			
			let setting = {
				headers: {
					username: $scope.username,
					ps: $scope.pass

				}
			}

			httpService.login_user(setting)
			.then((result) => {
				if(result.data.status == 400 || result.data.token == undefined || result.data.token == ''){
					messageNotification('Iniciar sesión',result.data.message,'info');
				}else{
					localStorage.setItem("token", result.data.token);
					localStorage.setItem("type","adm");
					$location.path('/admin');
				}
			});
			
		}
	}
]);