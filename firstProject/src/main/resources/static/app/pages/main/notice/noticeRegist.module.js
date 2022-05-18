(function(){
	'use strict';
	
	angular.module('myApp.main.noticeRegist',[])
		.config(routeConfig)
		.controller('noticeRegistCtrl', noticeRegistCtrl);
	
	function noticeRegistCtrl($scope, $rootScope, $location, $state, $window, userService){
		console.info("noticeRegistCtrl");
		
		if(sessionStorage.userInfo == undefined){
			alert('잘못된 접근입니다.');
			$state.go('board');
			return;
		}
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];

		var userInfo = JSON.parse(sessionStorage.userInfo);

		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('noticeRegist',{
			parent : 'main',
			url : '/noticeRegist',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/notice/noticeRegist.html',
					controller : 'noticeRegistCtrl'
				}
			}
		});
	}


})();