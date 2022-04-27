(function(){
	'use strict';
	
	angular.module('myApp.main.user',[])
		.config(routeConfig)
		.controller('userCtrl', userCtrl);
	
	function userCtrl($scope, $rootScope, $location, $state, $window, userService){
		console.info("userCtrl");
		
		if(sessionStorage.userInfo == undefined){
			alert('잘못된 접근입니다.');
			$state.go('board');
			return;
		}
		
		$rootScope.menuUrl = $location.path().split("/").reverse()[0];

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
				console.info("response", response);
				$scope.userdata = response.data.data;
				
			}, function(error){
				console.info("error", error);
			});
		}
		$scope.user();
		
		$scope.postCode = function(){
	    	new daum.Postcode({
		        oncomplete: function(data) {
		            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
		        	
		        	// 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var addr = ''; // 주소 변수
	                var extraAddr = ''; // 참고항목 변수

	                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    addr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    addr = data.jibunAddress;
	                }

	                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	                if(data.userSelectedType === 'R'){
	                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있고, 공동주택일 경우 추가한다.
	                    if(data.buildingName !== '' && data.apartment === 'Y'){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                    if(extraAddr !== ''){
	                        extraAddr = ' (' + extraAddr + ')';
	                    }
	                
	                }

	                $('#addr').val(addr + extraAddr);
		        	
		        }
		    }).open();
	    }
		
		
		$scope.regist = function(){
			if($scope.userdata.username == ""){
				alert("사용자 이름을 입력해주세요.");
				return;
			}else if($scope.userdata.email == undefined){
				alert("사용자 이메일을 입력해주세요.");
				return;
			}
			
			$scope.userdata.addr = $('#addr').val();
			
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