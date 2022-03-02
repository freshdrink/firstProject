(function(){
	'use strict'; //js코드에 대한 엄격모드. 엄격하게 적용하여 코딩실수나 안전하지 않는 동작에 경고를 줌.
	
	angular.module('myApp', [
		'ui.router',
		'myApp.theme',
		'myApp.login',
		'myApp.main'
	]).config(routeConfig)
	
	function routeConfig($stateProvider, $urlRouterProvider){
		
		$urlRouterProvider.otherwise("/login"); // 없는 경로일 경우, /login으로 초기화
		$stateProvider
		.state('home',{
			url : '', //주소창에 표시될 url
			abstract : true, //자체적으로 화면이 아닌 자식들을 활성화하는 것.
			template : "<div ui-view='standard'></div>" //ui-view에서 나타낼 template
		})
		.state('login',{
			parent: 'home',	//자신의 상위(부모)설정
			url: '/login',	//주소창에 표시될 url, 부모가 있을 경우 (부모의 url/나의 url형식)으로 접속해야함.
			views: {
				'standard': { // ui-view에서 작성 명칭
					templateUrl: 'app/pages/login/login.html', //ui-view에 이 경로의 파일을 뿌려줌
					controller : 'loginCtrl' //tempateUrl에서의 controller 부분
				}
			}
		})
		.state('main',{
			parent: 'home',
			url: '/main',
			views: {
		        'standard': {
		          templateUrl: 'app/pages/main/main.html',
		          controller : 'mainCtrl'
		        }
		      }
		})  
		
	}
	
})(); 