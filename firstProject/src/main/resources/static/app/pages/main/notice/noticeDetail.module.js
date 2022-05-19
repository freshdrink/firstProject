(function(){
	'use strict';
	
	angular.module('myApp.main.noticeDetail',[])
		.config(routeConfig)
		.controller('noticeDetailCtrl', noticeDetailCtrl);
	
	function noticeDetailCtrl($scope, $rootScope, $location, $state, $window, userService){
		console.info("noticeDetailCtrl");
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];
		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('noticeDetail',{
			parent : 'main',
			url : '/noticeDetail',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/notice/noticeDetail.html',
					controller : 'noticeDetailCtrl'
				}
			}
		});
	}


})();