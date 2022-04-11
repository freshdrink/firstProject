(function(){
	'use strict';
	
	angular.module('myApp.login')
		.service('Auth', Auth);
	
	function Auth($http, config){
		console.info("Auth");
		
		this.login = function login(loginData){
			console.info("logindata", loginData);
			return $http.post(config.apiUrl + 'login/loginProcess', loginData).then(function(data){
				return data
			});
		}
		
		this.getMenuList = function getMenuList(){
			console.info("menuList");
			return $http.get(config.apiUrl + 'login/getMenuList').then(function(data){
				return data;
			});
		}
		
		this.setSignUp = function setSignUp(param){
			console.info("setSignUp", param);
			return $http.post(config.apiUrl + 'login/setSignUp', param).then(function(data){
				return data;
			});
		}

	}
	
})();