reportpleno.controller('procesar_notas_controller', ['$scope', '$routeParams', '$http', '$location', '$cookies',
    function procesar_notas_controller($scope, $routeParams, $http, $location, $cookies) {



        $scope.conf = new Object();
        $scope.conf.nMin = 1.0;
        $scope.conf.nMax = 7.0;
        $scope.conf.nAprob = 4.0;
        $scope.conf.nExigencia = 60;
        $scope.conf.nPtjMaximo = 100;

        $scope.arrayPuntaje = [];
        $scope.contentPerPageNotas = 10;
        $scope.contentPerPageAlumnos = 6;
        /**
         * Metodos para subir archivo excel y leer
         */
        $scope.SelectFile = function (file) {
            $scope.SelectedFile = file;
        };
        $scope.Upload = function () {
            $('#water').css('display', 'block');


            if ($scope.SelectedFile != undefined && $scope.SelectedFile.name != undefined && validarDatosEntrada()) {

                //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
                var regex = /^([a-zA-Z0-9\s_\\.\-:\(\)])+(.xls|.xlsx)$/;

                if (regex.test($scope.SelectedFile.name.toLowerCase())) {
                    if (typeof (FileReader) != "undefined") {
                        $scope.calcularEscalaNotas();
                        var reader = new FileReader();
                        //For Browsers other than IE.
                        if (reader.readAsBinaryString) {
                            reader.onload = function (e) {
                                $scope.ProcessExcel(e.target.result);
                            };
                            reader.readAsBinaryString($scope.SelectedFile);
                            console.log(reader)
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
                            console.log(reader)
                        }
                    } else {
                        $('#water').css('display', 'none');
                        messageNotification('Navegador', 'Este navegador no soporta HTML5, por favor actualiza tu navegador a su ultima actualizacion', 'info');
                    }
                } else {
                    $('#water').css('display', 'none');
                    messageNotification('Archivo excel', 'Por favor, agrega un archivo excel valido', 'info');
                }
            } else {
                $('#water').css('display', 'none');
                messageNotification('Archivo excel', 'Seleccione archivo a procesar y/o configure correctamente la escala de notas', 'info');
            }
        };
        $scope.ProcessExcel = function (data) {
            var workbook = XLSX.read(data, {
                type: 'binary',
                cellDates: true,
                cellNF: false,
                cellText: false,
                dateNF: 'dd/mm/yyyy hh:mm:ss',
                
            });

            //Fetch the name of First Sheet.
            var firstSheet = workbook.SheetNames[0];



            //Read all rows from First Sheet into an JSON array.
            //var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
            // var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet], {header:3});
            var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{range: 3} );

            //Display the data from Excel file in Table.
            $scope.$apply(function () {
                $scope.Customers = excelRows;
                
                $scope.arrayAlumnos = [];
                
                console.log('arreglo de costumers', $scope.Customers);
                

                $scope.Customers.forEach(element => {
                    const largeKey = Object.keys(element).length;
                    if (largeKey == 1 || largeKey == 7) {

                        if (largeKey == 1) {

                            Object.entries(element).forEach(([key, value]) => {

                                if (value != 'Evaluaciones finalizadas' && value != 'Alumnos pendientes') {
                                    var alumnosPleno = {
                                        nombre: element[key] + '  *',
                                        fechaInicio: '',
                                        fechaTermino: '',
                                        respCorrectas: 0,
                                        respIncorrectas: 0,
                                        respOmitidas: 0,
                                        porcentaje: 0,
                                        status: 'ausente'
                                    }
                                    $scope.arrayAlumnos.push(alumnosPleno);
                                }
                            });
                        } else {

                            if(!element.hasOwnProperty('__EMPTY_1') && element['__EMPTY'] != 'Alumno') {
                                let alumnosPleno = {
                                    nombre: element['__EMPTY'],
                                    fechaInicio: element['__EMPTY_2'],
                                    fechaTermino: element['__EMPTY_3'],
                                    respCorrectas: element['__EMPTY_4'],
                                    respIncorrectas: element['__EMPTY_5'],
                                    respOmitidas: element['__EMPTY_6'],
                                    porcentaje: element['__EMPTY_7'],
                                    nivelLogro: '',
                                    status: 'rendida'
                                }
                                $scope.arrayAlumnos.push(alumnosPleno);
                            }
                        }
                    }
                });
                $scope.procesarExcelaNota();
                $scope.IsVisible = true;
                $('#water').css('display', 'none');
            });
        };
        $scope.procesarExcelaNota = async () => {
            $("#collapseFormularioProceso").collapse('hide');

            $scope.arrayPuntaje.forEach(notas => {

                $scope.arrayAlumnos.forEach(alumno => {
                    if (alumno.status == 'rendida') {
                        if (Number(alumno.porcentaje) === notas.puntaje) {
                            alumno.notaFinal = notas.nota;
                        }
                    }
                });
            });

        };
        $scope.calcularEscalaNotas = () => {

            const notaMins = $scope.conf.nMin;
            const notaMaximas = $scope.conf.nMax;
            const notaAprobacions = $scope.conf.nAprob;
            const exigencias = $scope.conf.nExigencia;
            const puntajeMaximos = $scope.conf.nPtjMaximo;

            const puntajeMinimoAprobacion = Math.round((exigencias / 100) * puntajeMaximos);
            const puntajeMaximoFor = Number(puntajeMaximos) + 1;

            $scope.arrayPuntaje = [];


            for (let index = 0; index < puntajeMaximoFor; index++) {

                if (index < puntajeMinimoAprobacion) {
                    const primerFactor = Number(notaAprobacions) - Number(notaMins);

                    const notaFinal = primerFactor * (index / puntajeMinimoAprobacion) + Number(notaMins);

                    const objetoNota = new Object({});
                    objetoNota.puntaje = index;
                    objetoNota.nota = Math.round(notaFinal * 10) / 10;

                    $scope.arrayPuntaje.push(objetoNota);

                } else {
                    const primerFactor = Number(notaMaximas) - Number(notaAprobacions);
                    const divisor = puntajeMaximos * (1 - exigencias / 100);
                    const notaFinal = primerFactor * ((Number(index) - puntajeMinimoAprobacion) / divisor) + Number(notaAprobacions);

                    const objetoNota = new Object({});
                    objetoNota.puntaje = index;
                    objetoNota.nota = Math.round(notaFinal * 10) / 10;

                    $scope.arrayPuntaje.push(objetoNota);
                }

            }

        };
        $scope.downloadExcel = function () {

            if ($scope.arrayAlumnos.length > 0) {

                if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                $scope.sumaNotasFinales = 0;
                $scope.alumnosEvaluados = 0;
                $scope.arrayAlumnos.filter((data) => {
                    if (data.status == 'rendida') {
                        $scope.alumnosEvaluados = $scope.alumnosEvaluados + 1;
                        $scope.sumaNotasFinales = $scope.sumaNotasFinales + data.notaFinal;

                    }
                });

                const promedioFinal = Math.round(($scope.sumaNotasFinales / $scope.alumnosEvaluados) * 10) / 10;
                const promedio = { nombre: '', fechaInicio: '', fechaTermino: '', respCorrectas: '', respIncorrectas: '', respOmitidas: '', porcentaje: '', status: 'Promedio General', notaFinal: promedioFinal };
                const exigencia = { nombre: '', fechaInicio: '', fechaTermino: '', respCorrectas: '', respIncorrectas: '', respOmitidas: '', porcentaje: '', status: 'Exigencia', notaFinal: $scope.conf.nExigencia + '%' };
                const puntajeMax = { nombre: '', fechaInicio: '', fechaTermino: '', respCorrectas: '', respIncorrectas: '', respOmitidas: '', porcentaje: '', status: 'Puntaje máximo', notaFinal: $scope.conf.nPtjMaximo };

                $scope.arrayAlumnos.push(promedio);
                $scope.arrayAlumnos.push(exigencia);
                $scope.arrayAlumnos.push(puntajeMax);

                var ws = XLSX.utils.json_to_sheet(JSON.parse(angular.toJson($scope.arrayAlumnos)));

                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
                XLSX.writeFile(wb, 'Procesador de Notas' + ".xlsx");
            } else {
                messageNotification('Descargar', 'No  se puede descargar excel por que no hay alumnos', 'warn')
            }
        };

        function validarDatosEntrada() {
            if ($scope.conf.nMin > $scope.conf.nMax) {
                return false;
            }

            if ($scope.conf.nAprob < $scope.conf.nMin) {
                return false;
            }

            if ($scope.conf.nAprob > $scope.conf.nMax) {
                return false;
            }

            return true;
        }

    }
]);