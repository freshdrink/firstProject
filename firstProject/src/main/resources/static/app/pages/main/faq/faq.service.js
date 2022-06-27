(function(){
	'use strict';
	
	angular.module('myApp.main.faq')
		.service('faqService', faqService);
	
	function faqService($http, config){
		console.info("faqService");
		
		this.getFaqList = function getFaqList(param){
			return $http.get(config.apiUrl + 'faq/getFaqList', {params: param}).then(function(response){
				return response;
			});
		};
		
	};
	
})();