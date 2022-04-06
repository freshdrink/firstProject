(function(){
	'use strict';
	
	angular.module('myApp.theme')
		.controller('mainTopCtrl', mainTopCtrl);
	
	function mainTopCtrl($scope, $window, Auth){
		console.info("mainTopCtrl");
		
		$scope.loginSession = (sessionStorage.userInfo == undefined) ? false : true;
		
		$scope.logout = function(){
			delete sessionStorage.userInfo;
			alert('로그아웃 되었습니다.');
			$window.location.reload();
		}
		
	}

})();


