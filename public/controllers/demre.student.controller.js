reportpleno.controller('demreStudentController', ['$scope','$routeParams','$http','$location','$cookies','httpService',
	function demreStudentController($scope,$routeParams, $http, $location,$cookies, httpService){
        
        $scope.selectedSubject = 'unselected';
        
        $scope.chargeAsignatures = function(){
            httpService.get_all_subject_score()
                       .then((response) => {
                           $scope.subjects = response.data.data;   
                       })
        }

        $scope.chargeAsignatures();

        
        
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
            var firstSheet = workbook.SheetNames[0];



            //Read all rows from First Sheet into an JSON array.
            //var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet],{range: 3});

            //Display the data from Excel file in Table.
            $scope.$apply(function () {
                $scope.Customers = excelRows;
                $scope.arrayTest = [];


                $scope.Customers.forEach(element => {
                    let object = {
                        evaluacion: element['Evaluacion'],
                        respOk: element['Respuestas Correctas'],
                        puntajeDemre: ''
                    }

                    $scope.arrayTest.push(object)
                });
                $('#water').css('display', 'none');
            });



        };


        $scope.procesarInfo = function(){
            $scope.arrayTest.forEach(async (elements) => {

                let score = await getScore(elements['evaluacion']);

                
                score.forEach((element) => {
                    if(Number(elements.respOk) == Number(element.CNT_PREGUNTAS)){
                        
                        elements.puntajeDemre = Number(element.PUNTAJE_PS);
                    }
                });
            });
            $scope.IsVisible = true;
        };


        $scope.downloadExcel = function () {

            if ($scope.arrayTest.length > 0) {

                if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                var ws = XLSX.utils.json_to_sheet(JSON.parse(angular.toJson($scope.arrayTest)));
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Alumnos');
                XLSX.writeFile(wb, 'Reportería Pleno - Puntaje Demre' + ".xlsx")
            } else {
                messageNotification('Descargar', 'No  se puede descargar excel por que no hay alumnos', 'warn')
            }
        }


        const getScore = async (cod_asig) => {
          let score = [];
           $scope.subjects.forEach((element) => {
               
                if(cod_asig.startsWith(String(element.CODE_ASIGN))){
                    score = element.SCORE;
                    
                }
                    
            });
            return score;
        };
	}
]);