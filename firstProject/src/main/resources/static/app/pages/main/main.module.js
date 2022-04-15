(function(){
	'use strict';
	
	angular.module('myApp.main',[
		'ui.router',
		'myApp.main.board',
		'myApp.main.user',
		'myApp.main.map'
	])
	.controller('mainCtrl', mainCtrl)
	
	function mainCtrl($scope){
		console.info("mainCtrl");
	};


})();