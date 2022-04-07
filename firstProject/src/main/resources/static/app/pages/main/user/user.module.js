(function(){
	'use strict';
	
	angular.module('myApp.main.user',[])
		.config(routeConfig)
		.controller('userCtrl', userCtrl);
	
	function userCtrl($scope, userService){
		console.info("userCtrl");

		var userInfo = JSON.parse(sessionStorage.userInfo);
		$scope.regAble = true;

		$scope.user = function(){
			return userService.getUser({userId: userInfo.userid}).then(function(response){

				$scope.userdata = response.data.data;
				
			}, function(error){
				console.info("error", error);
			});
		}
		$scope.user();
		
		
		$scope.regist = function(){
			console.info("userdata", $scope.userdata);
			if($scope.userdata.username == ""){
				alert("사용자 이름을 입력해주세요.");
				return;
			}else if($scope.userdata.email == undefined){
				alert("사용자 이메일을 입력해주세요.");
				return;
			}
			
			return userService.updateUser($scope.userdata).then(function(response){
				console.info("response", response.data);
				if(response.data){
					alert("수정 되었습니다.");
				}else{
					alert("문제가 발생하였습니다.");
				}
				$scope.user();
				$scope.regAble = true;
				
			}, function(error){
				console.error(error);
			});
		}

		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('user',{
			parent : 'main',
			url : '/user',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/user/user.html',
					controller : 'userCtrl'
				}
			}
		});
	}


})();