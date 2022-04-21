reportpleno.controller('asignaturaController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function asignaturaController($scope,$routeParams, $http, $location,$cookies, httpService){

		

		$scope.sidebar = { name: 'nav.sidebar.html', url: 'pages/shared/nav.bar.adm.html'};
		$scope.top_nav = { name: 'nav.header.html', url: 'pages/shared/nav.header.adm.html'}

		
		$scope.openModal = function(value){
			$('#'+value).modal('show')
		}

		$scope.closeModal = function(value){
			$('#'+value).modal('hide')
		}

		
		
		$scope.addLevel = function(){
			$scope.levels.push({ID:0,NIVEL:'Nuevo Nivel',ESTADO:1,PERSISTENCIA:0});
		}

		$scope.chargeAsignatures = function(){
            httpService.get_subject()
                       .then((response) => {
                           $scope.subjects = response.data.data;
                       });
        };

        $scope.chargeAsignatures();

		$scope.addAsignatura = () => {
			$scope.subjects.push({'ASIGNATURA':'ASIGNATURA','CODE_ASIGN':'CODIGO','ID_ASIGNATURA':0});
		};



		$scope.delete = (subject) => {
            if(subject['ID_ASIGNATURA'] == '0'){
				removeItemFromArr(subject, $scope.subjects);
			}else{

				
				const newSubject = {
					idAsignatura: subject['ID_ASIGNATURA'],
					asignatura: subject['ASIGNATURA'],
					code: subject['CODE_ASIGN']
				};

				fetch('/api/deleteAsignatura', {
					method: 'POST', // or 'PUT'
					body: JSON.stringify(newSubject), // data can be `string` or {object}!
					headers:{
					  'Content-Type': 'application/json',
					  'token': localStorage.getItem("token")
					}
				  }).then(res => res.json())
				  .catch(error => console.error('Error:', error))
				  .then(response => {
					  
					$scope.chargeAsignatures();
				  });
			}
		}


		$scope.save = (subject) => {

			const newSubject = {
				idAsignatura: subject['ID_ASIGNATURA'],
				asignatura: subject['ASIGNATURA'],
				code: subject['CODE_ASIGN']
			};

			fetch('/api/setAsignatura', {
				method: 'POST', // or 'PUT'
				body: JSON.stringify(newSubject), // data can be `string` or {object}!
				headers:{
				  'Content-Type': 'application/json',
				  'token': localStorage.getItem("token")
				}
			  }).then(res => res.json())
			  .catch(error => console.error('Error:', error))
			  .then(response => {
				  
				$scope.chargeAsignatures();
			  });
		};
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