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
		
		
		
		
		/** ================ 마커 표출 ==================== * */
		
		// 지도를 클릭한 위치에 표출할 마커입니다
		var marker = new kakao.maps.Marker({ 
		    // 지도 중심좌표에 마커를 생성합니다 
		    position: map.getCenter() 
		}); 
		// 지도에 마커를 표시합니다
		marker.setMap(map);
		

		
		
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
		// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        

		    // 클릭한 위도, 경도 정보를 가져옵니다 
		    var latlng = mouseEvent.latLng; 
		    
		    // 마커 위치를 클릭한 위치로 옮깁니다
		    marker.setPosition(latlng);
		    
		    $scope.msg(latlng);

		});
		
		
		/** ================ 클릭 이벤트 - 위경도 표시 ==================== * */
		$scope.msg = function(latlng){
			
		    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, <Br>';
		    message += '경도는 ' + latlng.getLng() + ' 입니다';
		    
		    var resultDiv = document.getElementById('result'); 
		    resultDiv.innerHTML = message;
		}
		$scope.msg(mapOption.center);
		
		
		
		
		/** ================ 마우스 오버 이벤트 - 인포윈도우 표시 ==================== * */
		
		// 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
		var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
		
		// 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({
		    content : iwContent
		});
		
		// 마커에 마우스오버 이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'mouseover', function() {
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