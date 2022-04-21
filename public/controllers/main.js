'use strict';
var reportpleno = angular.module('reportpleno',['ngRoute','ngCookies','ngFileUpload','angularUtils.directives.dirPagination','chart.js'] )

.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'/pages/home.html',
        controller:'home_controller'
	}).when('/login',{
        templateUrl: '/pages/admin/login.html',
        controller: 'loginController'
    }).when('/configdemre',{
        templateUrl: '/pages/admin/configdemre.html',
        controller: 'configDemreController'
    }).when('/config_demre_masivo',{
        templateUrl: '/pages/admin/configdemremasivo.html',
        controller: 'configDemreMasivoController'
    }).when('/admin',{
        templateUrl: '/pages/admin/admin.html',
        controller: 'adminController'
    }).when('/procesarNotas',{
        templateUrl: '/pages/procesar_notas.html',
        controller: 'procesar_notas_controller'
    }).when('/procesarDemre',{
        templateUrl: '/pages/demre.html',
        controller: 'demreController'
    }).when('/procesarDemreStudent',{
        templateUrl: '/pages/demre.student.html',
        controller: 'demreStudentController'
    }).when('/config_asignatura',{
        templateUrl: '/pages/admin/asignatura.html',
        controller: 'asignaturaController'
    }).when('/notFound',{
        templateUrl: '/pages/shared/404.html',
    }).otherwise({redirectTo:'/notFound'});


    //demreStudentController
      // configure html5 to get links working on jsfiddle
      $locationProvider.hashPrefix('');
  
  }]);



reportpleno.directive("directive", function() {
	return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
            function read() {
                // view -> model
                var html = element.html();
                html = html.replace(/&nbsp;/g, "\u00a0");
                ngModel.$setViewValue(html);
            }
            // model -> view
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "0");
            };

            element.bind("blur", function() {
                scope.$apply(read);
            });
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    this.blur();
                    event.preventDefault();
                }
            });
        }
	};
});

reportpleno.directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            ngModel.$render = function () {
                ngModel.$setViewValue(el.val());
            };

            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$render();
                });
            });
        }
    };
});