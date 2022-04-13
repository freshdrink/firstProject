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
			if($scope.signUpData.userId == ''){
				alert("아이디를 입력해주세요.");
				return;
			}else if(!$scope.idChk){
				alert("아이디 중복 확인을 해주세요.");
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
		
		//회원가입 id 중복 체크
		$scope.idChk = false;
		
		$scope.idCheck = function(){
			return Auth.idCheck({userId : $scope.signUpData.userId}).then(function(response){

				if(!response.data && $('#userid').val() != ''){ //중복x (녹색)
					$('#userid_etc').css('display','none');
					$('#userid').removeClass('is-invalid');
					$('#userid').addClass('is-valid');
					$scope.idChk = true;
				}else{ //중복 ㅇ
					if($('#userid').val() != ''){
						$('#userid_etc').css('display','block');
					}else{
						$('#userid_etc').css('display','none');
					}
					$('#userid').removeClass('is-valid');
					$('#userid').addClass('is-invalid');
					$scope.idChk = false;
				}
				
				
			}, function(error){
				console.info(error);
			});
			
		}
		
		//회원가입 ui 체크
		$scope.signChk = function(id){
			
			if(id == 'passwordChk'){
				if($('#password').val() != $('#passwordChk').val()){
					$('#'+id).removeClass('is-valid');
					$('#'+id).addClass('is-invalid');
					$('#pass_chk').css('display','block');
					return;
				}
				$('#pass_chk').css('display','none');
			}
			
			if($('#'+id).val() != ''){
				$('#'+id).removeClass('is-invalid');
				$('#'+id).addClass('is-valid');
			}else{
				$('#'+id).removeClass('is-valid');
				$('#'+id).addClass('is-invalid');
			}
			
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