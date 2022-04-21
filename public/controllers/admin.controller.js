reportpleno.controller('adminController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function adminController($scope,$routeParams, $http, $location,$cookies, httpService){
		$scope.sidebar = { name: 'nav.sidebar.html', url: 'pages/shared/nav.bar.adm.html'};
		$scope.top_nav = { name: 'nav.header.html', url: 'pages/shared/nav.header.adm.html'}

		
		$scope.openModal = function(value){
			$('#'+value).modal('show')
		}

		$scope.closeModal = function(value){
			$('#'+value).modal('hide')
		}

		/**
		 * Funciones para cargar los niveles
		 */
		
		$scope.addLevel = function(){
			$scope.levels.push({ID:0,NIVEL:'Nuevo Nivel',ESTADO:1,PERSISTENCIA:0});
		}

		$scope.charger_level = function(){
			let setting = {
				headers: {
					token: localStorage.getItem("token")
				}
			}
	
			let resultado = function(res){
				$scope.levels = res.data.levels;
			}
	
			httpService.get_level_all(setting).then(resultado);
		}

		$scope.charger_level();

		$scope.change_status_level = function(idLevel){
			let setting = {
				headers: {
					token: localStorage.getItem("token"),
					idLevel: idLevel
				}
			}

			httpService.put_change_status_level(setting)
			.then((result) => {
				messageNotification('Estado nivel de logro', result.data.message, 'info');
				$scope.charger_level();
			})
		}

		$scope.saveLevel = function(objLevel){
			let setting = {
				headers: {
					token: localStorage.getItem("token")
				}
			};

			let level = {
				idLevel: objLevel.ID,
				nameLevel: objLevel.NIVEL,
				statusLevel: objLevel.ESTADO
			};

			httpService.post_save_or_update_level(level, setting)
			.then((result) => {
				messageNotification('Guardar Nivel', result.data.message, 'info');
				$scope.charger_level();
			});
			
		}

		$scope.deleteLevel = function(objLevel){
			if(objLevel.PERSISTENCIA == 0){
				//Eliminamos el objeto en memoria
				removeItemFromArr(objLevel,$scope.levels);
			}else{
				//Elimino el registro desde la base de datos
				$scope.openModal('modalConfirm');
				$scope.deleteLevelId = objLevel.ID
			}
		}

		$scope.delete = function(){
			let setting = {
				headers: {
					token: localStorage.getItem("token"),
					idLevel: $scope.deleteLevelId
				}
			}

			httpService.delete_level(setting)
			.then((result) => {
				messageNotification('Eliminar nivel de logro', result.data.message, 'info');
				if(result.data.status == 200){
					$scope.charger_level();
					$scope.closeModal('modalConfirm');
				}
			});
		}

		

		

		/**
		 * Funciones para cargar las configuraciones de un nivel
		 */
		$scope.loadConfigByLevel = function(idLevel, nameLevel){
			$scope.openModal('modalConfiguracionNivel');
			$scope.nameLevel = nameLevel;
			$scope.idLevelByConfiguration = idLevel;
            if($scope.selectedLevel != 0){
                var setting = {
                    headers: {
                        token: localStorage.getItem("token"),
                        idLevel: Number(idLevel)
                    }
                }
                var resultado = function(res){
					
                    $scope.objAchievementLevel = res.data.config;
                }
                httpService.get_config_level(setting).then(resultado);
            }else{
                messageNotification('Nivel', 'Seleccione un nivel correcto', 'info')
            }
		}
		

		$scope.saveConfigByLevel = function(){
			let check = true;
			check = checkObjectLevel()

			
			if($scope.objAchievementLevel.length > 0 && check){
				$scope.objAchievementLevel.sort(function (x, y) {
					return x.max - y.max;
				});


				var setting = {
					headers: {
						token: localStorage.getItem("token"),
						idNivel: Number($scope.idLevelByConfiguration)
					}
				}

				httpService.delete_config_level(setting)
				.then((result) => {
					if(result.data.status == 200){
						let inicio = 0;
						let large = $scope.objAchievementLevel.length;
		
						function insertar(i){
							
							let settings = {
								headers: {
									token: localStorage.getItem("token")
								},
								data: {
									idConflevel: Number($scope.objAchievementLevel[i].id),
									level: $scope.objAchievementLevel[i].level,
									min: $scope.objAchievementLevel[i].min,
									max: $scope.objAchievementLevel[i].max,
									idNivel: Number($scope.idLevelByConfiguration)
								}
							}
							let resultado =function(response){
								inicio = inicio + 1;
								
								if(response.status == "200"){
									if(inicio < large) {
										insertar(inicio);
									}else{
										messageNotification('Configuracion Nivel De Logro','Tarea finalizada','info')
									}
								}else if(response.status == "400"){
									if(inicio < largo) {
										insertar(inicio);
									}else{
										//$("#loader").css("display","none")
										messageNotification('Configuracion Nivel De Logro','Tarea finalizada','info')
									}
								}
							}
							httpService.post_add_or_update(settings.data,settings.headers).then(resultado)
						}
						
						insertar(inicio);
					}else{
						messageNotification('Error de configuración','Ocurrio un error al configurar, por favor reintente','info')
					}
				});
			}else{
				messageNotification('Error de configuración','Antes de guardar la configuración, revise que no existan valores vacíos y que el nombre del nivel sea adecuado','danger')
			}
		}

		$scope.deleteConfigLevel = function(objLevel){
			removeItemFromArr(objLevel, $scope.objAchievementLevel);
		}

		$scope.addConfigLevel = function(){
			$scope.objAchievementLevel.push({id: 0, level: 'nuevo nivel', min: 0, max: 0});
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


		/**
		 * Funciones generales
		 */
		function removeItemFromArr (item, array ) {
			var i = array.indexOf(item);
		 
			if ( i !== -1 ) {
				array.splice( i, 1 );
			}
		}

		function guid() {
    		return 0;
		};

	


	}
]);