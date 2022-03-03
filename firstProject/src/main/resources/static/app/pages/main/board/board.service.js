(function(){
	'use strict';
	
	angular.module('myApp.main.board')
		.service('boardService', boardService);
	
	function boardService(){
		console.info("boardService");
		
		this.getBoard = function getBoard(){
			console.info("getBoard");
			
			return null;
		};

	}
	
})();