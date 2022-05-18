(function(){
	'use strict';
	
	angular.module('myApp.main.noticeDetail',[])
		.config(routeConfig)
		.controller('noticeDetailCtrl', noticeDetailCtrl);
	
	function noticeDetailCtrl($scope, $rootScope, $location, $state, $window, userService){
		console.info("noticeDetailCtrl");
		
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