reportpleno.controller('home_controller', ['$scope', '$routeParams', '$http', '$location', '$cookies', 'httpService',
    function home_controller($scope, $routeParams, $http, $location, $cookies, httpService) {



        Chart.defaults.global.colors = ['#A0B7D6', '#7697C4', '#4A6894', '#364A67', '#1CBDBB', '#1C3EBD', '#BD1CAC'];

        Chart.defaults.global.colors = [
            {
                backgroundColor: '#364A67'
            },
            {
                backgroundColor: '#4A6894'
            },
            {
                backgroundColor: '#7697C4'
            },
            {
                backgroundColor: '#A0B7D6'
            },
            {
                backgroundColor: '#1CBDBB'
            },
            {
                backgroundColor: '#BD1CAC'
            },
            {
                backgroundColor: '#1C3EBD'
            },

        ]

        // Chart.defaults.global.colors = [
        //     {
        //         backgroundColor: '#A0B7D6'
        //       },
        //       {
        //         backgroundColor: '#7697C4'
        //       },
        //       {
        //         backgroundColor: '#4A6894'
        //       },
        //       {
        //         backgroundColor: '#364A67'
        //       },
        //       {
        //         backgroundColor: '#1CBDBB'
        //       },
        //       {
        //         backgroundColor: '#BD1CAC'
        //       },
        //       {
        //         backgroundColor: '#1C3EBD'
        //       },

        // ]
        $scope.selectedLevel = '0';
        $scope.contentPerPage = String(settingsApp.contentPerPage);

        $('.collapse').collapse('hide')



        $scope.options = {
            legend: {
                display: true
            },
            // title: {
            //     display: true,
            //     text: 'Distribución de estudiantes según niveles de logro',
            //     fontSize: 25
            // },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    }
                }]
            }, tooltips: {
                mode: 'label',
                callbacks: {
                    label: function (tooltipItems, data) {
                        return tooltipItems.yLabel + '%';
                    }

                }
            },
            scaleLabel: function (label) { return label + '%' }


        }

        /**
         * Metodos para subir archivo excel y leer
         */
        $scope.SelectFile = function (file) {
            $scope.SelectedFile = file;


        };
        $scope.Upload = function () {
            $('#water').css('display', 'block');


            if ($scope.SelectFile != undefined && $scope.selectedLevel != 0) {
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
            } else {
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
                dateNF: 'dd/mm/yyyy hh:mm:ss'
            });



            //Fetch the name of First Sheet.
            var firstSheet = workbook.SheetNames[0];



            //Read all rows from First Sheet into an JSON array.
            //var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet],{range: 3});

            //Display the data from Excel file in Table.
            $scope.$apply(function () {
                $scope.Customers = excelRows;
                $scope.arrayAlumnos = [];

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
                                        nivelLogro: '',
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

                $scope.IsVisible = true;
                $('#water').css('display', 'none');
                loadUserData();

            });



        };

        function loadQuantityStudent() {
            let arrayStatus = []
            let arrayStudents = $scope.arrayAlumnos.filter(element => element.status == 'rendida');
            $scope.arrayStudentsActives = arrayStudents;

            for (let i = 0; i < $scope.objAchievementLevel.length; i++) {
                let obj = arrayStudents.filter(data => data.nivelLogro == $scope.objAchievementLevel[i].level)
                let objFinal = {
                    level: $scope.objAchievementLevel[i].level,
                    quantity: obj != undefined ? obj.length : 0
                }
                arrayStatus.push(objFinal);
            }

            $scope.arrayStudentActivesQuantity = arrayStatus.reverse();

            loadPorcentajeStudent();
        }
        function loadPorcentajeStudent() {
            const percentajeTotal = 100;
            const totalStudent = $scope.arrayStudentsActives.length;
            let arrayPorcentaje = [];
            for (let i = 0; i < $scope.arrayStudentActivesQuantity.length; i++) {

                let porcentaje = ($scope.arrayStudentActivesQuantity[i].quantity * percentajeTotal) / totalStudent;
                var obj = {
                    level: $scope.arrayStudentActivesQuantity[i].level,
                    percentage: porcentaje.toFixed(2)
                }

                arrayPorcentaje.push(obj)
            }


            $scope.arrayStudentActivesPercentage = arrayPorcentaje;


            createGraphic();
        }
        function createGraphic() {
            $scope.type = 'bar'
            $scope.labels = ['A'];
            $scope.series = getSeries();
            $scope.data = getData();


        }
        function getSeries() {
            let arraySeries = [];
            $scope.arrayStudentActivesPercentage.forEach(element => {
                arraySeries.push(element.level);
            })

            return arraySeries;
        }
        function getData() {
            let arrayData = []

            $scope.arrayStudentActivesPercentage.forEach(element => {
                let array = [element.percentage]
                arrayData.push(array);
            })

            return arrayData;
        }
        $scope.downloadExcel = function () {

            if ($scope.arrayAlumnos.length > 0) {

                if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                var ws = XLSX.utils.json_to_sheet(JSON.parse(angular.toJson($scope.arrayAlumnos)));
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
                XLSX.writeFile(wb, 'Reportería Pleno' + ".xlsx")
            } else {
                messageNotification('Descargar', 'No  se puede descargar excel por que no hay alumnos', 'warn')
            }
        }



        $scope.downloadGraphic = function () {
            $('#water').css('display', 'block');
            const canvas = document.getElementById('charts')
            $scope.img2 = new Image();
            $scope.img2.src = canvas.toDataURL()


            $http({
                method: 'POST',
                url: settingsApp.urlDownloadGraphic,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    imgGraphic: $scope.img2.src,
                    percentage: $scope.arrayStudentActivesPercentage,
                    quantity: $scope.arrayStudentActivesQuantity

                }
            }).then(function successCallback(response) {
                download('data:application/pdf;base64,' + response.data.data, 'Gráfico.pdf', 'application/pdf')
                $('#water').css('display', 'none');
            }, function errorCallback(response) {
                messageNotification('Informe', 'Ha ocurrido un error al generar informe, por favor reintentar', 'info')
                $('#water').css('display', 'none');
            });
        }

        $scope.downloadInform = function () {

            $('#water').css('display', 'block');
            const canvas = document.getElementById('charts')
            $scope.img2 = new Image();
            $scope.img2.src = canvas.toDataURL()


            $http({
                method: 'POST',
                url: settingsApp.urlDownloadReport,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    students: $scope.arrayAlumnos,
                    imgGraphic: $scope.img2.src,
                    percentage: $scope.arrayStudentActivesPercentage,
                    quantity: $scope.arrayStudentActivesQuantity

                }
            }).then(function successCallback(response) {
                download('data:application/pdf;base64,' + response.data.data, 'Reporte.pdf', 'application/pdf')
                $('#water').css('display', 'none');
            }, function errorCallback(response) {
                messageNotification('Informe', 'Ha ocurrido un error al generar informe, por favor reintentar', 'info')
                $('#water').css('display', 'none');
            });
        }
        /**
         * Funciones carga de parametros iniciales
         */

        /**
         * Cargar token para usuario normal
         */


        function parametersInitial() {

            let setting = {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
            let resultado = function (res) {
                $scope.niveles = res.data.levels;
            }
            httpService.get_level(setting).then(resultado);
        }
        parametersInitial();

        /**
         *  Funciones para procesar el excel
         */

        $scope.loadConfigByLevel = function () {
            if ($scope.selectedLevel != 0) {
                var setting = {
                    headers: {
                        token: localStorage.getItem("token"),
                        idLevel: Number($scope.selectedLevel)
                    }
                }

                var resultado = function (res) {

                    $scope.objAchievementLevel = res.data.config;
                }

                httpService.get_config_level(setting).then(resultado);
            } else {
                messageNotification('Nivel', 'Seleccione un nivel correcto', 'info')
            }
        }
        function getNiveldeLogro(porcentaje) {

            if ($scope.objAchievementLevel.length <= 0) {
                messageNotification('Nivel de Logros', 'Por favor seleccione el nivel de logro', 'info')
            } else {
                for (let i = 0; i < $scope.objAchievementLevel.length; i++) {
                    if (Number(porcentaje) <= $scope.objAchievementLevel[i].max) {
                        return String($scope.objAchievementLevel[i].level)
                    }
                }
            }
        }
        function loadUserData() {
            $scope.arrayAlumnos.forEach(element => {
                if (element.status != 'ausente') {
                    element.nivelLogro = getNiveldeLogro(element.porcentaje)
                } else {
                    element.nivelLogro = '-'
                }
            });

            loadQuantityStudent();
        }

    }
]);