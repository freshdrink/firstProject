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

	}
	
})();