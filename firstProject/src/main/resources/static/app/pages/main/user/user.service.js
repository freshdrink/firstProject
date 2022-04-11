(function(){
	'use strict';
	
	angular.module('myApp.main.user')
		.service('userService', userService)
	
	function userService($http, config){
		
		this.getUser = function getUser(param){
			console.info("getUser");
			return $http.get(config.apiUrl + 'login/getUser',{params : param}).then(function(response){
				return response;
			});
		};
		
		this.updateUser = function updateUser(param){
			console.info("updateUser");
			return $http.post(config.apiUrl + 'login/updateUser', param).then(function(response){
				return response;
			});
		}
		
		this.changePasswd = function changePasswd(param){
			console.info("changePasswd", param);
			return $http.post(config.apiUrl + 'login/changePasswd', param).then(function(response){
				return response;
			});
		}
		
		this.deleteChk = function deleteChk(param){
			console.info("delUser", param);
			return $http.post(config.apiUrl + 'login/deleteChk', param).then(function(response){
				return response;
			});
		}
		
	};

})();