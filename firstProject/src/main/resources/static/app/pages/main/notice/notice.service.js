(function(){
	'use strict';
	
	angular.module('myApp.main.notice')
		.service('noticeService', noticeService)
	
	function noticeService($http, config){
		console.info("noticeService");
		
		this.getNoticeList = function getNoticeList(){
			return $http.get(config.apiUrl + 'notice/getNoticeList').then(function(response){
				return response;
			});
		}
		
		
	};

})();