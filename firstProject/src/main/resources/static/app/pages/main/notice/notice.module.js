(function(){
	'use strict';
	
	angular.module('myApp.main.notice',[])
		.config(routeConfig)
		.controller('noticeCtrl', noticeCtrl);
	
	function noticeCtrl($scope, $rootScope, $location, $state, $window, noticeService){
		console.info("noticeCtrl");
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];

		$scope.option = "title";
		$scope.keyword = "";

		$scope.callback = function(pagination){
			var param = {
				option : $scope.option,
				keyword : $scope.keyword,
				offset : pagination.offset,
				limit : pagination.limit
			};
			
			return noticeService.getNoticeList(param).then(function(response){
				console.info("response", response);
				
				$scope.notice = response.data.list;
				$scope.ntTotal = response.data.total;
				
				return {total: $scope.ntTotal}
				
			}, function(error){
				console.error('error', error);
			});
		}
		//$scope.noticeList();
		
		
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