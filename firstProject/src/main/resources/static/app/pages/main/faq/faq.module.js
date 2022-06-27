(function(){
	'use strict';
	
	angular.module('myApp.main.faq',[])
		.config(routeConfig)
		.controller('faqCtrl', faqCtrl);
	
	function faqCtrl($scope, $rootScope, $location, $sce, faqService){
		console.info("faqCtrl");
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];
		delete sessionStorage.notiParam;
		
		$scope.option = "title";
		$scope.keyword = ""; 
		
		$scope.callback = function(pagination){
			$scope.page = pagination.page;
			$scope.limit = pagination.limit;
			
			var param = {
				option : $scope.option,
				keyword : $scope.keyword,
				offset : pagination.offset,
				limit : pagination.limit
			};
			
			return faqService.getFaqList(param).then(function(response){
				//console.info("response", response);
				
				$scope.faq = response.data.list;
				$scope.faqTotal = response.data.total;
				
				return {total: $scope.faqTotal}
				
			}, function(error){
				console.error('error', error);
			});
		};
		
		$scope.bindHtml = function(content){
			return $sce.trustAsHtml(content);
		}
		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('faq',{
			parent : 'main',
			url : '/faq',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/faq/faq.html',
					controller : 'faqCtrl'
				}
			}
		});
	}
	
})();