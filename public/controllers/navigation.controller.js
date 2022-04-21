reportpleno.controller('side_bar_controller', ['$scope','$routeParams','$http','$location','$cookies',
	function side_bar_controller($scope,$routeParams, $http, $location,$cookies){
		$scope.sidebar = { name: 'nav.sidebar.html', url: 'pages/shared/nav.bar.html'};
		$scope.type = localStorage.getItem('dHlwZQ==');
	}
]);


reportpleno.controller('top_nav_controller', ['$scope','$routeParams','$http','$location','$cookies',
	function top_nav_controller($scope,$routeParams, $http, $location,$cookies){
		$scope.simplenav = { name: 'nav.header.simple.html', url: 'pages/shared/nav.bar.simple.html'}
		$scope.top_nav = { name: 'nav.header.html', url: 'pages/shared/nav.header.html'}
		
		
		$scope.maxLevel = settingsApp.maxArchieveLevel;

		function achievementLevels(){
			$scope.objAchievementLevel = JSON.parse(Base64.decode(localStorage.getItem('archieveLevel')));
		}

		$scope.openModal =  function(modal){
			$('#'+modal).modal('show');
			achievementLevels();
		}

		$scope.checkLevel = function(){
			
		}

		$scope.saveLevel = function(){

			let check = true;
			check = checkObjectLevel()

			
			if($scope.objAchievementLevel.length > 0 && check){
				$scope.objAchievementLevel.sort(function (x, y) {
					return x.max - y.max;
				});

				localStorage.setItem('archieveLevel',Base64.encode(JSON.stringify($scope.objAchievementLevel)));
				messageNotification('Configuración de Niveles','Configuración guardada correctamente','success')
				$('#frmLevelogro').modal('hide')
				
			}else{
				messageNotification('Error de configuración','Antes de guardar la configuración, revise que no existan valores vacíos y que el nombre del nivel sea adecuado','danger')
			}
		}

		$scope.addLevel = function(){
			$scope.objAchievementLevel.push({level: 'nuevo nivel', min: 0, max: 0});
		}

		$scope.removeLevel = function(obj){
			removeItemFromArr(obj)
		}


		function removeItemFromArr (item ) {
			var i = $scope.objAchievementLevel.indexOf(item);
		 
			if ( i !== -1 ) {
				$scope.objAchievementLevel.splice( i, 1 );
			}
		}


		function checkObjectLevel(){
			for (let index = 0; index < $scope.objAchievementLevel.length; index++) {
				if($scope.objAchievementLevel[index].level == 'nuevo nivel' || $scope.objAchievementLevel[index].level == ''){
					
					return false;
				}
				 if($scope.objAchievementLevel[index].min == ''){
					
					return false;
				}
				 if($scope.objAchievementLevel[index].max == ''){
					
					return false;
				}
				
			}

			return true;
		}
		
	}
]);