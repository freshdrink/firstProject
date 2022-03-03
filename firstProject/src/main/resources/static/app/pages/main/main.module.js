(function(){
	'use strict';
	
	angular.module('myApp.main',[
		'ui.router',
		'myApp.main.board'
	])
	.controller('mainCtrl', mainCtrl)
	
	function mainCtrl($scope){
		console.info("mainCtrl");
	};


})();