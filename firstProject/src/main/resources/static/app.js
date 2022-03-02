(function(){
	'use strict'; //js코드에 대한 엄격모드. 엄격하게 적용하여 코딩실수나 안전하지 않는 동작에 격고를 줌.
	
	angular.module('myApp', [])
	.controller('test', test);
	
	function test($scope){
		console.info("test");
		
		$scope.angularTest = "Angular Test Success"; 
		
	}
})(); 