reportpleno.controller('configDemreController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function configDemreController($scope,$routeParams, $http, $location,$cookies, httpService){
		$scope.sidebar = { name: 'nav.sidebar.html', url: 'pages/shared/nav.bar.adm.html'};
		$scope.top_nav = { name: 'nav.header.html', url: 'pages/shared/nav.header.adm.html'};
        $scope.selectedSubject = "selected";
		$scope.contentPerPage = 10;
		$scope.subjectsScore = [];
		$scope.openModal = function(value){
			$scope.pointsGet = '';
			$scope.questionQuantity = '';
			$('#'+value).modal('show')
		};

		$scope.closeModal = function(value){
			$('#'+value).modal('hide')
		};

		$scope.chargeAsignatures = function(){
            httpService.get_subject()
                       .then((response) => {
                           $scope.subjects = response.data.data;
                       });
        };

        $scope.chargeAsignatures();


		$scope.changeSubject = function(){

			
            httpService.get_score_subject($scope.selectedSubject)
            .then((response) => {
                $scope.subjectsScore = response.data.data;
				$scope.subjectsScore.sort((a,b) => (a.CNT_PREGUNTAS > b.CNT_PREGUNTAS) ? 1 : ((b.CNT_PREGUNTAS > a.CNT_PREGUNTAS) ? -1 : 0));
				
            });
        };


		$scope.addPtje = function(){
			$scope.subjectsScore.push({ "PUNTAJE_PS":$scope.pointsGet,"CNT_PREGUNTAS": $scope.questionQuantity });	
			$scope.pointsGet = '';
			$scope.questionQuantity = '';

			$scope.subjectsScore.sort((a,b) => (a.CNT_PREGUNTAS > b.CNT_PREGUNTAS) ? 1 : ((b.CNT_PREGUNTAS > a.CNT_PREGUNTAS) ? -1 : 0));
			$scope.closeModal('modalCreatePuntaje');
		};

		$scope.deletePoint =  (object) => {

			const data = {
				"asignatura": $scope.selectedSubject,
				"cntOk": object.CNT_PREGUNTAS,
				"puntaje": object.PUNTAJE_PS
			}
			
			fetch('/api/deletePtjeDemre', {
				method: 'POST', // or 'PUT'
				body: JSON.stringify(data), // data can be `string` or {object}!
				headers:{
				  'Content-Type': 'application/json',
				  'token': localStorage.getItem("token")
				}
			  }).then(res => res.json())
			  .catch(error => $('#water').css('display','none'))
			  .then(response => {
				httpService.get_score_subject($scope.selectedSubject)
				.then((response) => {
					$scope.subjectsScore = response.data.data;
				});
			  });
		}

		$scope.savePoint = () => {

			$('#water').css('display','block')
			$scope.subjectsScore.map((element, index, array) => {

				if (array.length - 1 === index) {
					const data = {
						"asignatura": $scope.selectedSubject,
						"cntOk": element.CNT_PREGUNTAS,
						"puntaje": element.PUNTAJE_PS
					}
					
					fetch('/api/setPtjeDemre', {
						method: 'POST', // or 'PUT'
						body: JSON.stringify(data), // data can be `string` or {object}!
						headers:{
						  'Content-Type': 'application/json',
						  'token': localStorage.getItem("token")
						}
					  }).then(res => res.json())
					  .catch(error => $('#water').css('display','none'))
					  .then(response => {
						  if(response.message === 'OK'){
							  element.status = response.data;
						  }else{
							  element.status = "Valor no insertado";
						  }

						  $('#water').css('display','none');
					  });
					  
					  $scope.copyArray = $scope.subjectsScore;

					  httpService.get_score_subject($scope.selectedSubject)
								.then((response) => {
									$scope.subjectsScore =  $scope.copyArray;
								});
				} else {
					const data = {
						"asignatura": $scope.selectedSubject,
						"cntOk": element.CNT_PREGUNTAS,
						"puntaje": element.PUNTAJE_PS
					}
					
					fetch('/api/setPtjeDemre', {
						method: 'POST', // or 'PUT'
						body: JSON.stringify(data), // data can be `string` or {object}!
						headers:{
						  'Content-Type': 'application/json',
						  'token': localStorage.getItem("token")
						}
					  }).then(res => res.json())
					  .catch(error => $('#water').css('display','none'))
					  .then(response => {
						  if(response.message === 'OK'){
							  element.status = response.data;
						  }else{
							  element.status = "Valor no insertado";
						  }
					  });
				}

				
			});
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