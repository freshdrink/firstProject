(function(){
	'use strict';
	
	angular.module('myApp.main.noticeRegist',[])
		.config(routeConfig)
		.controller('noticeRegistCtrl', noticeRegistCtrl);
	
	function noticeRegistCtrl($scope, $rootScope, $location, $state, $window, $stateParams, noticeService){
		console.info("noticeRegistCtrl");
		
		if(sessionStorage.userInfo == undefined){
			alert('잘못된 접근입니다.');
			$state.go('board');
			return;
		}
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];
		$scope.userInfo = JSON.parse(sessionStorage.userInfo);
		//$scope.notiSeq = $stateParams.param1;
		$scope.notiSeq = sessionStorage.notiParam;
		
		if($scope.notiSeq){
			detail();
		}
		
		function validate(){
			if($scope.title == undefined || $scope.title == ''){
				alert("제목을 입력해주세요");
			}else if($scope.content == undefined || $scope.content == ''){
				alert("내용을 입력해주세요");
			}else{
				return true;
			}
			return false;
		}
		
		$scope.insert = function(){
			if(!validate()) return;
			
			var params = {
				title : $scope.title, 
				content : $scope.content,
				creatId : $scope.userInfo.username
			};
			
			return noticeService.noticeInsert(params).then(function(response){
				//console.info("response", response);
				
				alert("공지사항이 등록되었습니다.");
				$state.go('noticeDetail',{param1: response.data});
				
			}, function(error){
				console.info("error", error);
			});
		}
		
		function detail(){
			var params = {
				notiSeq : $scope.notiSeq
			};
			
			return noticeService.getNoticeDetail(params).then(function(response){
				$scope.title = response.data.title;
				$scope.creatId = response.data.creatId;
				$scope.content = response.data.content;
				
			}, function(error){
				console.error('error', error);
			});
		}
		
		
		$scope.regist = function(){
			if(!validate()) return;
				
			var params = {
				notiSeq : $scope.notiSeq,
				title : $scope.title, 
				content : $scope.content,
				modiId : $scope.userInfo.username
			};
			
			return noticeService.noticeUpdate(params).then(function(response){
				console.info("response", response);
				alert("수정이 완료되었습니다.");
				
				$state.go('noticeDetail', {param1 : response.data});
				
			}, function(error){
				console.error('error', error);
			});
		}
		
		$scope.back = function(){
			if($scope.notiSeq){
				$state.go('noticeDetail', {param1 : $scope.notiSeq});
			}else{
				$state.go('notice');
				delete sessionStorage.notiParam;
			}
		}

	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('noticeRegist',{
			parent : 'main',
			url : '/noticeRegist',
			params : {
				param1 : null
			},
			views : {
				'main' : {
					templateUrl : 'app/pages/main/notice/noticeRegist.html',
					controller : 'noticeRegistCtrl'
				}
			}
		});
	}


})();