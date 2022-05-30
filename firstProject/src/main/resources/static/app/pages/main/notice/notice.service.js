(function(){
	'use strict';
	
	angular.module('myApp.main.notice')
		.service('noticeService', noticeService)
	
	function noticeService($http, config){
		console.info("noticeService");
		
		this.getNoticeList = function getNoticeList(param){
			return $http.get(config.apiUrl + 'notice/getNoticeList', {params: param}).then(function(response){
				return response;
			});
		};
		 
		this.getNoticeDetail = function getNoticeDetail(param){
			return $http.get(config.apiUrl + 'notice/getNoticeDetail', {params: param}).then(function(response){
				return response;
			});
		};
		
		this.noticeInsert = function noticeInsert(param){
			return $http.post(config.apiUrl + 'notice/noticeInsert', param).then(function(response){
				return response;
			});
		};
		
		this.noticeUpdate = function noticeUpdate(param){
			return $http.post(config.apiUrl + 'notice/noticeUpdate', param).then(function(response){
				return response;
			});
		};
		
	};

})();