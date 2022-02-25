(function(){
	'use strict';
	
	angular.module('myApp', [])
	.controller('test', test);
	
	function test($scope){
		console.info("test");
		
		$scope.angularTest = "Angular Test Success"; 
		
	}
})(); 