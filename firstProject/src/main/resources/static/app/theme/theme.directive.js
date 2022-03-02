(function(){
	'use strict';
	
	angular.module('myApp.theme',[])
		.directive('mainTop', mainTop)
		.directive('mainBottom', mainBottom);
	
	/** restrict 종류 (지시자 선언 종류) :: restrict 얽매이다는 뜻
		A : attribute - html 속성 값처럼 사용 - ex) <div my-sample>
		E : element - 태그처럼 작성하여 화면에 보여줌 - ex) <my-sample>
		C : class - 클래스 명처럼 사용 - ex) <div class="my-sample">
		M : comment - 주석 - ex) <!-- directive: my-sample -->
	**/
	
	function mainTop(){
		return {
			restrict: 'E',
			templateUrl: 'app/theme/topBottom/mainTop.html'
		};
	};
	
	function mainBottom(){
		return {
			restrict: 'E',
			templateUrl: 'app/theme/topBottom/mainBottom.html'
		};
	};


})();