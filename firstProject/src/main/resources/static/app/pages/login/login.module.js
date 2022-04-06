(function(){
	'use strict';
	
	angular.module('myApp.login', [])
	.controller('loginCtrl', loginCtrl);
	
	function loginCtrl($scope, $state, Auth){
		console.info("loginCtrl");
		
		$scope.login = function(loginData){
			if(loginData == undefined){
				alert("아이디와 패스워드를 입력해주세요.");
				return;
			}else if(loginData.userId == undefined || loginData.userId == ''){
				alert("아이디를 입력해주세요.");
				return;
			}else if(loginData.passwd == undefined || loginData.passwd == ''){
				alert("패스워드를 입력해주세요.");
				return;
			}
			
			Auth.login(loginData).then(function(data) {
				console.info("data", data);
				
				sessionStorage.userInfo = JSON.stringify(data.data.list);
				
				$state.go('board');
				
			},function(error) {
				console.error(error);
				alert(error.data.message);
			});
		}
		
		
	};


	
})();