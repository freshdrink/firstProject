(function(){
	'use strict';
	
	angular.module('myApp.main.board',[])
		.config(routeConfig)
		.controller('boardCtrl', boardCtrl);
	
	function boardCtrl($scope, boardService){
		console.info("boardCtrl");
		
		$scope.test = function(){
			$scope.number = 2;
			return boardService.getBoard({seq: $scope.number}).then(function(response){
				console.info("response", response);
			}, function(error) {
				console.error('error', error);
			});
		}
		$scope.test();
		
		
	}
	
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
	}


})();