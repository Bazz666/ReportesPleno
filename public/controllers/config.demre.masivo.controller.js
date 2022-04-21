reportpleno.controller('configDemreMasivoController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function configDemreMasivoController($scope,$routeParams, $http, $location,$cookies, httpService){
		$scope.sidebar = { name: 'nav.sidebar.html', url: 'pages/shared/nav.bar.adm.html'};
		$scope.top_nav = { name: 'nav.header.html', url: 'pages/shared/nav.header.adm.html'};

		
		$scope.selectedSubject = 'unselected';
        
        $scope.chargeAsignatures = function(){
            httpService.get_subject()
                       .then((response) => {
                           $scope.subjects = response.data.data;
                       })
        }

        $scope.chargeAsignatures();

        $scope.changeSubject = function(){
            httpService.get_score_subject($scope.selectedSubject)
            .then((response) => {
                $scope.subjectsScore = response.data.data;
            })
        }
        
        /**
         * Metodos para subir archivo excel y leer
         */
        $scope.SelectFile = function (file) {
            $scope.SelectedFile = file;
            $scope.Upload();
            
        };
        $scope.Upload = function () {
            $('#water').css('display', 'block');
            
            
            if($scope.SelectFile != undefined && $scope.selectedLevel  != 0){
                //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
                var regex = /^([a-zA-Z0-9\s_\\.\-:\(\)])+(.xls|.xlsx)$/;
                
                if (regex.test($scope.SelectedFile.name.toLowerCase())) {
                    if (typeof (FileReader) != "undefined") {
                        var reader = new FileReader();
                        //For Browsers other than IE.
                        if (reader.readAsBinaryString) {
                            reader.onload = function (e) {
                                $scope.ProcessExcel(e.target.result);
                            };
                            reader.readAsBinaryString($scope.SelectedFile);
                        } else {
                            //For IE Browser.
                            reader.onload = function (e) {
                                var data = "";
                                var bytes = new Uint8Array(e.target.result);
                                for (var i = 0; i < bytes.byteLength; i++) {
                                    data += String.fromCharCode(bytes[i]);
                                }
                                $scope.ProcessExcel(data);
                            };
                            reader.readAsArrayBuffer($scope.SelectedFile);
                        }
                    } else {
                        $('#water').css('display', 'none');
                        messageNotification('Navegador', 'Este navegador no soporta HTML5, por favor actualiza tu navegador a su ultima actualizacion', 'info')
                    }
                } else {
                    $('#water').css('display', 'none');
                    messageNotification('Archivo excel', 'Por favor, agrega un archivo excel valido', 'info')
                }
            }else{
                $('#water').css('display', 'none');
                messageNotification('Archivo excel', 'Seleccione archivo a procesar y/o seleccione el nivel de logro con cual trabajar', 'info')
            }
        };
        $scope.ProcessExcel = function (data) {
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary',
                cellDates: true,
                cellNF: false,
                cellText: false,
                dateNF:'dd/mm/yyyy hh:mm:ss'
            });


            
            //Fetch the name of First Sheet.
            var firstSheet = workbook.range("A4:end");



            //Read all rows from First Sheet into an JSON array.
            //var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet],{range: 3});

            //Display the data from Excel file in Table.
            $scope.$apply(function () {
                $scope.subjectsScore = excelRows;
                
				$scope.IsVisible = true;
                $('#water').css('display', 'none');
            });



        };


        $scope.procesarInfo = function(){

            $scope.IsVisible = true;
        };

		$scope.savePoint = () => {

			$('#water').css('display','block')
			$scope.subjectsScore.map((element, index, array) => {

				if (array.length - 1 === index) {
					const data = {
						"asignatura": $scope.selectedSubject,
						"cntOk": element['Cantidad Preguntas'],
						"puntaje": element['Puntaje']
					};
					
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

						  $scope.copyArray = $scope.subjectsScore;

						  httpService.get_score_subject($scope.selectedSubject)
									.then((response) => {
										$scope.subjectsScore =  $scope.copyArray;
									});

						  $('#water').css('display','none');
					  });
					  
					 
				} else {
					const data = {
						"asignatura": $scope.selectedSubject,
						"cntOk": element['Cantidad Preguntas'],
						"puntaje": element['Puntaje']
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


	}
]);