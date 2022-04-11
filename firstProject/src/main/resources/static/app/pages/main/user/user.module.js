(function(){
	'use strict';
	
	angular.module('myApp.main.user',[])
		.config(routeConfig)
		.controller('userCtrl', userCtrl);
	
	function userCtrl($scope, $state, $window, userService){
		console.info("userCtrl");

		var userInfo = JSON.parse(sessionStorage.userInfo);
		$scope.regAble = true;
		
		$('#passwdChkModal').modal({backdrop:'static', keyboard:false});
		$('#userDelete').modal({backdrop:'static', keyboard:false});
		
		$('#passwdChkModal').on('hidden.bs.modal', function () {
			$('#passwd').val(undefined);
			$('#newPasswd').val(undefined);
			$('#newPasswd2').val(undefined);
		});
		
		$('#userDelete').on('hidden.bs.modal', function () {
			$('#deleteChk').val(undefined);
		});
		
		
		$scope.user = function(){
			return userService.getUser({userId: userInfo.userid}).then(function(response){

				$scope.userdata = response.data.data;
				
			}, function(error){
				console.info("error", error);
			});
		}
		$scope.user();
		
		
		$scope.regist = function(){
			console.info("userdata", $scope.userdata);
			if($scope.userdata.username == ""){
				alert("사용자 이름을 입력해주세요.");
				return;
			}else if($scope.userdata.email == undefined){
				alert("사용자 이메일을 입력해주세요.");
				return;
			}
			
			return userService.updateUser($scope.userdata).then(function(response){
				console.info("response", response.data);
				if(response.data){
					alert("수정 되었습니다.");
				}else{
					alert("문제가 발생하였습니다.");
				}
				$scope.user();
				$scope.regAble = true;
				
			}, function(error){
				console.error(error);
			});
		}
		
		
		$scope.changePw = function(){
			if($scope.passwd == undefined || $scope.passwd == ''){
				alert("현재 비밀번호를 작성해주세요.");
				return;
			}else if($scope.newPasswd == undefined || $scope.newPasswd == ''){
				alert("새로운 비밀번호를 작성해주세요.");
				return;
			}else if($scope.newPasswdChk == undefined || $scope.newPasswdChk == ''){
				alert("새로운 비밀번호 확인을 작성해주세요.");
				return;
			}else if($scope.newPasswd != $scope.newPasswdChk){
				alert("비밀번호가 다릅니다.");
				return;
			}
			
			var params = {
					userid : userInfo.userid,
					passwd : $scope.passwd,
					newPwd : $scope.newPasswd,
					pwdChk : $scope.newPasswdChk
			}
			console.info("params", params);
			
			return userService.changePasswd(params).then(function(response){
				console.info("response changpwd", response);
				
				if(response.data){
					alert("비밀번호가 변경되었습니다.");
					delete sessionStorage.userInfo;
					$('#passwdChkModal').modal('hide');
					$state.go("login");
				}
				
			}, function(error){
				console.error("error", error);
				alert(error.data.message);
			});
			
		}
		
		
		$scope.delUser = function(){
			if($scope.deleteChk == undefined || $scope.deleteChk == ''){
				alert("패스워드를 입력해주세요.");
				return;
			}
			
			if(confirm("정말로 탈퇴하시겠습니까?")){
				
				var param = {
						userid : userInfo.userid,
						passwd : $scope.deleteChk
				}
				
				return userService.deleteChk(param).then(function(response){
					console.info("response deleteChk", response);
					
					if(response.data){
						alert("계정이 삭제 되었습니다.");
						delete sessionStorage.userInfo;
						$('#userDelete').modal('hide');
						$state.go("board");

						setTimeout(function(){
							$window.location.reload();
						},50);
					}
					
				}, function(error){
					console.error("error", error);
					alert(error.data.message);
				});
				
			}else{
				return;
			}
		}
		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('user',{
			parent : 'main',
			url : '/user',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/user/user.html',
					controller : 'userCtrl'
				}
			}
		});
	}


})();