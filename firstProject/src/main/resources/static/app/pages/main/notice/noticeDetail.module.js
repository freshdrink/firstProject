(function(){
	'use strict';
	
	angular.module('myApp.main.noticeDetail',[])
		.config(routeConfig)
		.controller('noticeDetailCtrl', noticeDetailCtrl);
	
	function noticeDetailCtrl($scope, $rootScope, $location, $state, $stateParams, noticeService){
		console.info("noticeDetailCtrl");
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];

		if($stateParams.param1 == undefined || $stateParams.param1 == null){
			$scope.notiSeq = sessionStorage.notiParam;
		}else{
			$scope.notiSeq = $stateParams.param1;
		}

		$scope.notiDetail = function(){
			var params = {
				notiSeq : $scope.notiSeq
			};
			
			return noticeService.getNoticeDetail(params).then(function(response){

				$scope.detail = response.data;
				sessionStorage.notiParam = JSON.stringify($scope.detail.notiSeq);
				
			}, function(error){
				console.error('error', error);
			});
		}
		$scope.notiDetail();
		
		$scope.goList = function(){
			delete sessionStorage.notiParam;
			$state.go('notice');
		}
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('noticeDetail',{
			parent : 'main',
			url : '/noticeDetail',
			params : {
				param1 : null
			},
			views : {
				'main' : {
					templateUrl : 'app/pages/main/notice/noticeDetail.html',
					controller : 'noticeDetailCtrl'
				}
			}
		});
	}


})();