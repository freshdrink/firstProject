package com.project.firstProject.board.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstProject.board.service.BoardService;
import com.project.firstProject.board.vo.BoardVO;

/**
 * 
 * @RequestMapping
 * 	- uri를 통해서 요청이 들어왔을때, 그 요청 uri와 매핑하기 위해 사용하는 부분.
 * 	 (결국 service에서 $http.get을 통해서 날라온 uri와 RequestMapping에 적힌 경로가 같아야함) 
 *  - 사용할때는 그 매핑이 일어나는 곳과 한세트를 이루어야함.
 * 
 * @RestController
 *  - @Controller와 @ResponseBody가 합쳐진것
 *  
 *  - @Controller를 사용했을 당시, 
 *  	화면을 보여주는 View를 반환하는 기능을 가졌으나(데이터 포함),
 *  	 데이터만 보내야하는 경우, 
 *   	@ResponseBody를 사용하면 되었다.
 *   	하지만 그것이 너무 번거로워 두가지의 기능이 합쳐진 것.
 *  - 기본적으로 json 형식으로 보냄.
 *  
 *  - @Controller : 서비스와 뷰의 중재자 역할
 *  - @ResponseBody : Response(응답)할 때, 데이터를 담아주는 곳(body)를 합친 것.
 *  	따라서 응답내용을 담아서 (json형식으로) 데이터 응답하는 곳.(보내는곳) <-> RequestBody : (Request:요청) 
 *  
 *  @Autowired
 *   - 필요한 의존 객체의 '타입'에 해당하는 해당하는 빈(Bean:spring에서 생성되고 관리되는 자바객체)을 찾아주는 것.
 *   - @Service는 Bean 자바객체를 생성해주고, @Autowired는 생성된 Bean 자바객체를 찾는 것.
 *  
 * */

@RestController
@RequestMapping(value="testApi/v1.0/board") // 매핑 경로의 공통부분 (부모)
public class BoardController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired // 필드 주입식
	private BoardService boardService;
	
	@RequestMapping(value="/getBoard", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public Map<String, Object> getBoard(BoardVO boardVo){
		logger.info("getBoard");
		
		//Map<String, Object> maplist = new HashMap<String, Object>();
		//maplist.put("list", maplist);
		
		Map<String, Object> maplist = boardService.getBoard(boardVo);
		
		return maplist;
	}
	

}
