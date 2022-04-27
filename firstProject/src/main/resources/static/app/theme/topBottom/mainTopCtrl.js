(function(){
	'use strict';
	
	angular.module('myApp.theme')
		.controller('mainTopCtrl', mainTopCtrl);
	
	function mainTopCtrl($scope, $window, $state, Auth){
		console.info("mainTopCtrl");
		
		$scope.loginSession = (sessionStorage.userInfo == undefined) ? false : true;
		
		if($scope.loginSession){
			var userInfo = JSON.parse(sessionStorage.userInfo);
			$scope.username = userInfo.username;
		}
		
		$scope.logout = function(){
			delete sessionStorage.userInfo;
			alert('로그아웃 되었습니다.');
			
			$state.go('board');
			setTimeout(function(){
				$window.location.reload();
			},50);
			
		}
		
		$scope.menuList = function(){
			console.info("$scope.loginSession", $scope.loginSession);
			return Auth.getMenuList().then(function(response){
				console.info("menuList response", response);
				$scope.menulist = response.data.list;
				
				/*if(!loginSession){
					$scope.menulist
				}*/
			}, function(error){
				console.info('error', error);
			});
		}
		$scope.menuList();
		
	}

})();


