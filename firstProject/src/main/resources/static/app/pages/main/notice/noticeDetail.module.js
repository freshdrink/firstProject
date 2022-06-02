(function(){
	'use strict';
	
	angular.module('myApp.main.noticeDetail',[])
		.config(routeConfig)
		.controller('noticeDetailCtrl', noticeDetailCtrl);
	
	function noticeDetailCtrl($scope, $rootScope, $location, $state, $stateParams, $sce, noticeService){
		console.info("noticeDetailCtrl");
		
		$scope.user = false;
		if(sessionStorage.userInfo) $scope.user = true;
		
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
		
		$scope.bindHtml = function(content){
			return $sce.trustAsHtml(content);
		}
		
		$scope.delNotice = function(){
			var result = confirm("정말로 삭제하시겠습니까?");
			
			if(result){
				var params = {
						notiSeq : $scope.notiSeq
				};
				
				return noticeService.noticeDelete(params).then(function(response){
					$state.go('notice');
				}, function(error){
					console.error('error', error);
				});
			}
		}
		
		$scope.goList = function(){
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