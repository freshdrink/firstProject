(function(){
	'use strict';
	
	angular.module('myApp.main.board',[])
	.config(routeConfig)
	.controller('boardCtrl', boardCtrl);
	
	function boardCtrl($scope){
		console.info("boardCtrl");
	};
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('board',{
			parent : 'main',
			url : '/board',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/board/board.html',
					controller : 'boardCtrl'
				}
			}
		});
	};


})();