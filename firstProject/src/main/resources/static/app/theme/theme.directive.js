(function(){
	'use strict';
	
	angular.module('myApp.theme',[])
		.directive('mainTop', mainTop)
		.directive('mainBottom', mainBottom)
		.directive('pagingMaker', pagingMaker)
		.directive('pagingMaker2', pagingMaker2)
		.directive('fileModel',["$rootScope", '$parse', '$http', fileModel]);
	
	/** restrict 종류 (지시자 선언 종류) :: restrict 얽매이다는 뜻
		A : attribute - html 속성 값처럼 사용 - ex) <div my-sample>
		E : element - 태그처럼 작성하여 화면에 보여줌 - ex) <my-sample>
		C : class - 클래스 명처럼 사용 - ex) <div class="my-sample">
		M : comment - 주석 - ex) <!-- directive: my-sample --> 
	**/
	
	function mainTop(){
		return {
			restrict: 'E',
			templateUrl: 'app/theme/topBottom/mainTop.html',
			controller : 'mainTopCtrl'
		};
	};
	
	function mainBottom(){
		return {
			restrict: 'E',
			templateUrl: 'app/theme/topBottom/mainBottom.html'
		};
	};
	
	function pagingMaker($interval){
		return {
			restric: 'E',
			template :
				'<nav aria-label="Page navigation example" ng-hide="pagination.total <= pagination.limit || hideFlag"><ul class="pagination justify-content-center">'
				+ '<li class="page-item" ng-class="pagination.first ? \'\' : \'none\'" ng-click="first();"><span class="page-link">&Lang;</span></li>'
				+ '<li class="page-item" ng-class="pagination.prev ? \'\' : \'none\'" ng-click="prev();"><span class="page-link">&lang;</span></li>'
				+ '<li class="page-item" ng-class="p == pagination.page? \'active\' : \'\'" ng-repeat="p in pagination.curPages" ng-click="update(p)"><span class="page-link">{{p}}</span></li>'
				+ '<li class="page-item" ng-class="pagination.next ? \'\' : \'none\'" ng-click="next();"><span class="page-link">&rang;</span></li>'
				+ '<li class="page-item" ng-class="pagination.last ? \'\' : \'none\'" ng-click="last();"><span class="page-link">&Rang;</span></li>'
				+'</ul></nav>',
			replace: true, //template에 있는 내용으로 교체를 유무를 체크 (페이징은 계속 변화가 있어야하므로 true)
			scope : //현재 함수(?) 내에서만 사용할 새로운 scope 객체를 생성. 부모 scope도 상속가능.
				{ 	//{} 중괄호 안에 값을 사용하면 부모 scope의 값을 읽거나 사용하지 못하게 한다.
					limit : '@limit', //부모 scope에 접근하기 위해서 사용하는 것 binding 전략(@, =, &)을 사용
					length : '@length',
					callback : '=?callback',
					search : '=?search'
				},
			link : function (scope, element, attrs){
				scope.init = function(){
					scope.pagination = {
							offset : 0,							//
							limit : parseInt(scope.limit),		//
							length : parseInt(scope.length),	// 화면에 표시될  1, 2, 3, 4, 5 페이지의 갯수 (pagination에서 지정해줌)
							tLength : 0,						// 1, 2, 3, 4, 5 페이지의 총 갯수(length의 전체). 게시판을 limit으로 나눴을때 나오는 값. (배열로 만들어주기 위한 값)
							page : 1,							// 현재 페이지(current Page)
							pages : [],							// 페이지 번호 리스트
							curPages : [],						// 현재 화면에 보일 페이지 목록
							total : 0,							// 게시글 전체 갯수
							first : false,						// 맨앞으로 이동버튼 (show 유무용 + 이동)
							last : false,						// 맨뒤로 이동버튼 (show 유무용 + 이동)
							prev : false,						// 이전으로 이동버튼 (show 유무용 + 이동)
							next : false,						// 다음으로 이동버튼 (show 유무용 + 이동)
							sPage : 1,							// 페이징 번호의 시작 번호
							ePage : 10							// 페이징 번호의 끝 번호
					};
				};
				scope.init();
				
				//맨 앞페이지로 이동
				scope.first = function(){
					if(!scope.pagination.first) return;
	                scope.hideFlag = true;				// ???
	                scope.pagination.sPage = 1;			// 해당 페이지의 첫번째 페이지넘버
	                scope.pagination.ePage = 1 + scope.pagination.length;	// 해당 페이지의 마지막 페이지 넘버
	                scope.pagination.page = 1;			// 맨앞은 언제나 현재 페이지가 1로 만들어져야함.
				};
				
				//이전으로 이동
				scope.prev = function() {
					if(!scope.pagination.prev) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = scope.pagination.sPage - scope.pagination.length; // 해당 페이지의 첫번째 페이지넘버
					scope.pagination.ePage = scope.pagination.ePage - scope.pagination.length; // 해당 페이지의 마지막 페이지 넘버
					scope.pagination.page = scope.pagination.sPage; // 이전으로 이동시 해당 페이지의 첫번째가 현재 페이지로 해주어야함.
				};
				
				//다음으로 이동
				scope.next = function() {
					if(!scope.pagination.next) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = scope.pagination.sPage + scope.pagination.length; // 해당 페이지의 첫번째 페이지넘버
					scope.pagination.ePage = scope.pagination.ePage + scope.pagination.length; // 해당 페이지의 마지막 페이지 넘버
					scope.pagination.page = scope.pagination.sPage; // 다음으로 이동시 해당 페이지의 첫번째가 현재 페이지로 해주어야함.
				};
	            
				//마지막으로 이동
				scope.last = function() {
					if(!scope.pagination.last) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = (Math.ceil(scope.pagination.tLength / scope.pagination.length) - 1) * scope.pagination.length +1;
					scope.pagination.ePage = scope.pagination.tLength; // 맨마지막 페이지 번호는 하단페이지 목록의 총갯수와 같다.
					scope.pagination.page = scope.pagination.tLength; // 맨마지막으로 이동하는 것이므로 tLength와 같다.
	            };
				
	            //원하는 페이지 클릭시
	            scope.update = function(page) {
	                if(scope.pagination.page == page) return;
	                scope.pagination.page = page;
	            };
	            
	            
				scope.search = function(page){
					//console.info("page", page);
					//검색시 무조껀 맨 처음으로
					if(scope.pagination.page == 1){
						scope.refresh(1);
					}else{
						//무조껀 맨 처음으로
						scope.first();
					}
				};
				
				scope.refresh = function(page){
					scope.pagination.offset = (page-1) * scope.pagination.limit;
					
					if(scope.callback){
						return scope.callback(scope.pagination).then(function(data){
							if(angular.isUndefined(data)) return;
							
							scope.pagination.total = data.total;
							scope.pagination.tLength = Math.ceil(scope.pagination.total / scope.pagination.limit);
							scope.pagination.first = (page == 1) ? false : true;
							scope.pagination.prev = (page <= scope.pagination.length) ? false : true;
							scope.pagination.next = (scope.pagination.tLength > scope.pagination.length) &&
								!(page > ((Math.ceil(scope.pagination.tLength / scope.pagination.length) - 1) * scope.pagination.length))
								? true : false;
							scope.pagination.last = (page == scope.pagination.tLength) ? false : true;
							
						});
					}
				};
				
				scope.$watchGroup(['pagination.sPage', 'pagination.total', 'pagination.page'], function(arr, old) {
					//console.log('pagination.sPage & length & total & page ', arr, old);

					scope.pagination.pages = [];
					for(var i=0; i<scope.pagination.tLength; ++i) {
						scope.pagination.pages.push(1+i);
					}

					var pageArray = scope.pagination.pages.splice(arr[0]-1, scope.pagination.length);

					scope.refresh(arr[2]).then(function() {
						scope.pagination.curPages = pageArray.slice();
						$interval(function() {
							scope.hideFlag = false;
						}, 700, 1);
					});
				});
				
			}
		}
	};
	
	function pagingMaker2($interval){
		return {
			restric: 'E',
			template :
				'<nav aria-label="Page navigation example" ng-hide="pagination.total <= pagination.limit || hideFlag"><ul class="pagination justify-content-center">'
				+ '<li class="page-item" ng-class="pagination.first ? \'\' : \'none\'" ng-click="first();"><span class="page-link">&Lang;</span></li>'
				+ '<li class="page-item" ng-class="pagination.prev ? \'\' : \'none\'" ng-click="prev();"><span class="page-link">&lang;</span></li>'
				+ '<li class="page-item" ng-class="p == pagination.page? \'active\' : \'\'" ng-repeat="p in pagination.pages | limitTo : pagination.length" ng-click="update(p)"><span class="page-link">{{p}}</span></li>'
				+ '<li class="page-item" ng-class="pagination.next ? \'\' : \'none\'" ng-click="next();"><span class="page-link">&rang;</span></li>'
				+ '<li class="page-item" ng-class="pagination.last ? \'\' : \'none\'" ng-click="last();"><span class="page-link">&Rang;</span></li>'
				+'</ul></nav>',
			replace: true, //template에 있는 내용으로 교체를 유무를 체크 (페이징은 계속 변화가 있어야하므로 true)
			scope : //현재 함수(?) 내에서만 사용할 새로운 scope 객체를 생성. 부모 scope도 상속가능.
				{ 	//{} 중괄호 안에 값을 사용하면 부모 scope의 값을 읽거나 사용하지 못하게 한다.
					limit : '@limit', //부모 scope에 접근하기 위해서 사용하는 것 binding 전략(@, =, &)을 사용
					length : '@length',
					callback : '=?callback',
					search : '=?search'
				},
			link : function (scope, element, attrs){
				scope.init = function(){
					scope.pagination = {
							offset : 0,							//
							limit : parseInt(scope.limit),		//
							length : parseInt(scope.length),	// 화면에 표시될  1, 2, 3, 4, 5 페이지의 갯수 (pagination에서 지정해줌)
							tLength : 0,						// 1, 2, 3, 4, 5 페이지의 총 갯수(length의 전체). 게시판을 limit으로 나눴을때 나오는 값. (배열로 만들어주기 위한 값)
							page : 1,							// 현재 페이지(current Page)
							pages : [],							// 화면에 보일 페이지 갯수 [1,2,3]
							total : 0,							// 게시글 전체 갯수
							first : false,						// 맨앞으로 이동버튼 (show 유무용 + 이동)
							last : false,						// 맨뒤로 이동버튼 (show 유무용 + 이동)
							prev : false,						// 이전으로 이동버튼 (show 유무용 + 이동)
							next : false,						// 다음으로 이동버튼 (show 유무용 + 이동)
							sPage : 1,
							ePage : 10
					};
				};
				scope.init();
				
				//맨 앞페이지로 이동
				scope.first = function(){
					if(!scope.pagination.first) return;
	                scope.hideFlag = true;				// ???
	                scope.pagination.sPage = 1;			// 해당 페이지의 첫번째 페이지넘버
	                scope.pagination.ePage = 1 + scope.pagination.length;	// 해당 페이지의 마지막 페이지 넘버
	                scope.pagination.page = 1;			// 맨앞은 언제나 현재 페이지가 1로 만들어져야함.
				};
				
				//이전으로 이동
				scope.prev = function() {
					if(!scope.pagination.prev) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = scope.pagination.sPage - scope.pagination.length; // 해당 페이지의 첫번째 페이지넘버
					scope.pagination.ePage = scope.pagination.ePage - scope.pagination.length; // 해당 페이지의 마지막 페이지 넘버
					scope.pagination.page = scope.pagination.sPage; // 이전으로 이동시 해당 페이지의 첫번째가 현재 페이지로 해주어야함.
				};
				
				//다음으로 이동
				scope.next = function() {
					//console.info(scope.pagination);
					if(!scope.pagination.next) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = scope.pagination.sPage + scope.pagination.length; // 해당 페이지의 첫번째 페이지넘버
					scope.pagination.ePage = scope.pagination.ePage + scope.pagination.length; // 해당 페이지의 마지막 페이지 넘버
					scope.pagination.page = scope.pagination.sPage; // 다음으로 이동시 해당 페이지의 첫번째가 현재 페이지로 해주어야함.
				};
	            
				//마지막으로 이동
				scope.last = function() {
					if(!scope.pagination.last) return;
					scope.hideFlag = true;				// ???
					scope.pagination.sPage = (Math.ceil(scope.pagination.tLength / scope.pagination.length) - 1) * scope.pagination.length +1;
					scope.pagination.ePage = scope.pagination.tLength; // 맨마지막 페이지 번호는 하단페이지 목록의 총갯수와 같다.
					scope.pagination.page = scope.pagination.tLength; // 맨마지막으로 이동하는 것이므로 tLength와 같다.
	            };
				
	            //원하는 페이지 클릭시
	            scope.update = function(page) {
	                if(scope.pagination.page == page) return;
	                scope.pagination.page = page;
	            };
	            
	            
				scope.search = function(page){
					//console.info("page", page);
					//검색시 무조껀 맨 처음으로
					if(scope.pagination.page == 1){
						scope.refresh(1);
					}else{
						//무조껀 맨 처음으로
						scope.first();
					}
				};
				
				scope.refresh = function(page){
					scope.pagination.offset = (page-1) * scope.pagination.limit;
					
					if(scope.callback){
						return scope.callback(scope.pagination).then(function(data){
							if(angular.isUndefined(data)) return;
							
							scope.pagination.total = data.total;
							scope.pagination.tLength = Math.ceil(scope.pagination.total / scope.pagination.limit);
							scope.pagination.first = (page == 1) ? false : true;
							scope.pagination.prev = (page <= scope.pagination.length) ? false : true;
							scope.pagination.next = (scope.pagination.tLength > scope.pagination.length) &&
								!(page > ((Math.ceil(scope.pagination.tLength / scope.pagination.length) - 1) * scope.pagination.length))
								? true : false;
							scope.pagination.last = (page == scope.pagination.tLength) ? false : true;
							
						});
					}
				};
				
				scope.$watch('pagination.page', function(value) {
					scope.refresh(value).then(function() {
						$interval(function() {
							scope.hideFlag = false;
						}, 700, 1);
					});
				});
				
				scope.$watch('pagination.total', function(value) {
					if(angular.isUndefined(value)) return;
					// total이 갱신되면, 로딩된 페이지 목록들도 초기화 되므로 비워주고, 배열 다시 삽입.
					scope.pagination.pages = [];
					for(var i=0; i<scope.pagination.tLength; ++i) {
						scope.pagination.pages.push(1+i);
					}
				});
				
			}
		}
	};

	function fileModel($rootScope, $parse, $http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function (event) {
                	console.info("event", event);
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                    scope.file = (event.srcElement || event.target).files[0];
                    var fd = new FormData();
                    var file = scope.file;
                    
                    console.info("fd", fd);
                    console.info("file", file);
                    /* fd.append('file', file);
                    $http({
                        method: 'POST',
                        url: '      url',
                        data: fd,
                        headers: {'Content-Type': undefined}
                    })
                    .success(function (response) {
                        if (response.success) {
                            console.log(response)
                        }
                    });*/
                });
            }
        };
    };
	

})();