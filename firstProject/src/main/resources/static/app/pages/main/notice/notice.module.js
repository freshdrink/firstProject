(function(){
	'use strict';
	
	angular.module('myApp.main.notice',[])
		.config(routeConfig)
		.controller('noticeCtrl', noticeCtrl);
	
	function noticeCtrl($scope, $rootScope, $location, $state, $window, noticeService){
		console.info("noticeCtrl");
		
		if(sessionStorage.userInfo == undefined){
			alert('잘못된 접근입니다.');
			$state.go('board');
			return;
		}
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];

		var userInfo = JSON.parse(sessionStorage.userInfo);
		$scope.option = "title";
		$scope.keyword = "";

		$scope.noticeList = function(){
			var param = {
				option : $scope.option,
				keyword : $scope.keyword
			};
			return noticeService.getNoticeList(param).then(function(response){
				console.info("response", response);
				
				$scope.notice = response.data.list;
				$scope.ntTotal = response.data.total;
				
			}, function(error){
				console.error('error', error);
			});
		}
		$scope.noticeList();
		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('notice',{
			parent : 'main',
			url : '/notice',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/notice/notice.html',
					controller : 'noticeCtrl'
				}
			}
		});
	}


})();