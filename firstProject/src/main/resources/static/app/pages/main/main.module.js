(function(){
	'use strict';
	
	angular.module('myApp.main',[
		'ui.router',
		'myApp.main.board',
		'myApp.main.user',
		'myApp.main.map',
		'myApp.main.notice',
		'myApp.main.noticeDetail',
		'myApp.main.noticeRegist'
	])
	.controller('mainCtrl', mainCtrl)
	
	function mainCtrl($scope){
		console.info("mainCtrl");
	};


})();