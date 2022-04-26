(function(){
	'use strict';
	
	angular.module('myApp.main.map',[])
		.config(routeConfig)
		.controller('mapCtrl', mapCtrl);
	
	function mapCtrl($scope){
		console.info("mapCtrl");

		/*var userInfo = JSON.parse(sessionStorage.userInfo);*/
		
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		
	    mapOption = { 
	        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };

		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		var map = new kakao.maps.Map(mapContainer, mapOption);
		
		// 인포윈도우를 생성입니다
		var infowindow = new kakao.maps.InfoWindow({zindex:1}); 
		
		
		
		
		
		/** ================ 처음 접근 시의 마커 표출 ==================== * */
		// 지도에 표출할 마커입니다
		var marker = new kakao.maps.Marker(); 
		
		// 마커가 생성될 위치(포지션) 세팅
		marker.setPosition(map.getCenter());
		marker.setMap(map);// 지도에 마커를 표시합니다


		
		
		
		/** ============== html5에서 해당 위치 가져오는것 (geolocation) ==================== * */

		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
		if (navigator.geolocation) {
			
		    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
		    navigator.geolocation.getCurrentPosition(function(position) {

		        var lat = position.coords.latitude, // 위도
		            lon = position.coords.longitude; // 경도
		        
		        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
		        
		        // 마커 위치를 클릭한 위치로 옮깁니다
			    marker.setPosition(locPosition);
			    // 지도 중심을 이동 시킵니다
			    map.setCenter(locPosition);
			    
			    $scope.msg(locPosition);

		      });
		    
		}
		
		
		
		

		/** ================ 클릭 이벤트 ==================== * */

		// 지도에 클릭 이벤트를 등록합니다
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

			// 상세 주소 정보 요청
			// 마지막 파라미터로 넘어온 함수를 호출합니다. (주소정보)
		    searchDetailAddrFromCoords(mouseEvent.latLng, addrData);
		    
		    //클릭한 위치로 마커 이동
		    marker.setPosition(mouseEvent.latLng);

		    //클릭한 위치의 위도 경도 표시
		    $scope.msg(mouseEvent.latLng);
		});
		
		
		
		
		/** ================ 상세 주소 정보 요청 함수 ==================== * */
		// 주소-좌표 변환 객체를 생성합니다
		// 카카오맵에서 지원해주는 라이브러리를 추가해야 작동. 참고 : https://apis.map.kakao.com/web/guide/  에서 라이브러리 불러오기
		var geocoder = new kakao.maps.services.Geocoder();
		
		function searchDetailAddrFromCoords(coords, callback) {
		    // 좌표로 법정동 상세 주소 정보를 요청합니다
		    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
		};
		
		
		
		
		/** ================ 주소 정보 텍스트 담아주는 함수 ==================== * */
		
		function addrData(result, status){
	        if (status === kakao.maps.services.Status.OK) {
	        	var addr = '';
	        	addr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
	        	addr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
	        	
	        	$scope.detailAddr = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + addr + '</div>';

	        }   
		}
		
		
		
		
		/** ================ 위경도 표시 ==================== * */
		$scope.msg = function(latlng){
			
		    var message = '클릭한 위치의 위도는 ' + latlng.getLat().toFixed(6) + ' 이고, <Br>';
		    message += '경도는 ' + latlng.getLng().toFixed(6) + ' 입니다';

		    var coordsDiv = document.getElementById('coords'); 
		    coordsDiv.innerHTML = message;
		    
		    searchDetailAddrFromCoords(latlng, addrData);
		    
		    var addrDiv = document.getElementById('address'); 
		    
		    setTimeout(function(){
			    addrDiv.innerHTML = $scope.detailAddr;
		    },150);
		    
		}
		$scope.msg(mapOption.center);
		
		
		
	
		
		/** ================ 마우스 오버 이벤트 - 인포윈도우 표시 ==================== * */

		// 마커에 마우스오버 이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'mouseover', function() {

			//인포 윈도우에 content 세팅 (상세 주소정보)
			infowindow.setContent($scope.detailAddr);
			
			// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
		    infowindow.open(map, marker);
		});

		// 마커에 마우스아웃 이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'mouseout', function() {
		    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
		    infowindow.close();
		});
		
		
		
		
		/** ================ 지도 확대 축소 ==================== * */
		
		/*// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
		$scope.zoomIn = function() {
		    map.setLevel(map.getLevel() - 1);
		}

		// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
		$scope.zoomOut = function() {
		    map.setLevel(map.getLevel() + 1);
		}*/
		
		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new kakao.maps.MapTypeControl();
		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		
		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
		

		
		
	}
	
	function routeConfig($stateProvider){
		$stateProvider
		.state('map',{
			parent : 'main',
			url : '/map',
			views : {
				'main' : {
					templateUrl : 'app/pages/main/map/map.html',
					controller : 'mapCtrl'
				}
			}
		});
	}


})();