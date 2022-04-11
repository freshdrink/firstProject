(function(){
	'use strict';
	
	angular.module('myApp.signUp',[])
		.config(routeConfig)
		.controller('signUpCtrl', signUpCtrl);
	
	function signUpCtrl($scope, $state, $window, Auth){
		console.info("signUpCtrl");
		
		$scope.signUpData = {
				userId : '',
				passwd : '',
				passwdChk : '',
				userNm : '',
				email : '',
				addr : ''
		};
		
		$scope.signUp = function(){
			console.info("$scope.signUpData", $scope.signUpData);
			if($scope.signUpData.userId == ''){
				alert("아이디를 입력해주세요.");
				return;
			}else if($scope.signUpData.passwd == ''){
				alert("비밀번호를 입력해주세요.");
				return;
			}else if($scope.signUpData.passwdChk == ''){
				alert("비밀번호 확인을 입력해주세요.");
				return;
			}else if($scope.signUpData.passwd != $scope.signUpData.passwdChk){
				alert("비밀번호가 다릅니다.");
				return;
			}else if($scope.signUpData.userNm == ''){
				alert("사용자명을 입력해주세요.");
				return;
			}else if($scope.signUpData.email == ''){
				alert("이메일을 입력해주세요.");
				return;
			}else if($scope.signUpData.email == undefined){
				alert("이메일 형식에 맞춰 입력해주세요.");
				return;
			}else if($scope.signUpData.addr == ''){
				alert("주소를 입력해주세요.");
				return;
			}
			
			return Auth.setSignUp($scope.signUpData).then(function(response){
				console.info("response", response);
				
				if(response.data){
					alert("회원가입이 완료 되었습니다. 로그인을 해주시기 바랍니다.");
					$state.go('login');
				}
				
			}, function(error){
				console.info("error", error);
			})
			
			
		}
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('signup',{
			parent : 'home',
			url : '/signup',
			views : {
				'standard' : {
					templateUrl : 'app/pages/login/signUp.html',
					controller : 'signUpCtrl'
				}
			}
		});
	}


})();