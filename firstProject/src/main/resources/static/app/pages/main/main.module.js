(function(){
	'use strict';
	
	angular.module('myApp.main',[
		'ui.router',
		'myApp.main.board',
		'myApp.main.user',
		'myApp.main.map',
		'myApp.main.notice',
		'myApp.main.noticeDetail',
		'myApp.main.noticeRegist',
		'myApp.main.faq'
	])
	.controller('mainCtrl', mainCtrl)
	
	function mainCtrl($scope){
		console.info("mainCtrl");
	};


})();