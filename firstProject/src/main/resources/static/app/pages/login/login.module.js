(function(){
	'use strict';
	
	angular.module('myApp.login', [])
	.controller('loginCtrl', loginCtrl);
	
	function loginCtrl($scope){
		console.info("loginCtrl");
	};


	
})();