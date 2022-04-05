(function(){
	'use strict';
	
	angular.module('myApp.main.board')
		.service('boardService', boardService);
	
	function boardService($http, config){
		console.info("boardService");
		console.info("config", config);
		
		/** 
		 $http : 원격 서버에서 데이터를 읽기 위한 angularjs 서비스
		 	- get : $http 서버를 통해서 angualrjs에서 지원해주는 서비스 이용 (다양)
		 config : app.js에서 .constant에서 작성한대로 설정된 값. (constant : 상수 / 일정한)
		 * */
		
		this.getBoard = function getBoard(param){
			console.info("getBoard");
			return $http.get(config.apiUrl + 'board/getBoard',{params : param}).then(function(response){
				return response;
			});
		};

	}
	
})();