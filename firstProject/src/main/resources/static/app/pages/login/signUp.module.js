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
	                $scope.signChk('addr');
		        	
		        }
		    }).open();
	    }
		
		$scope.signUp = function(){
			console.info("signUpData.addr", $scope.signUpData);
			console.info("$('#addr').val()", $('#addr').val());
			
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
			}else if($('#addr').val() == ''){
				alert("주소를 입력해주세요.");
				return;
			}
			
			$scope.signUpData.addr = $('#addr').val();
			
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