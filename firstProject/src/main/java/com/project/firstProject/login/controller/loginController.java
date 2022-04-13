package com.project.firstProject.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstProject.exception.LoginProcessExeption;
import com.project.firstProject.login.service.LoginService;
import com.project.firstProject.login.vo.LoginVO;

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
 *  
 *  @RequestBody
 *   - form에서 받은 전달값 userId, passwd를 body형식으로 담아 온다.
 *   - VO형식으로 받으면 VO에 설정된 값과 통신을 통해 넘어온 값이 대칭대는 값으로 하여 들어온다.
 *   - VO형식에 맞지 않은 값이 들어온다면 그 값은 제외하고 전달받는다.
 *   - String으로 값을 받는다면 전달값들이 json 형식으로 전부 String이 되어 넘어온다.
 *   
 *   @ReqeustParam
 *    - HttpServletRequest와 같음.
 *    - url에서 ex)http://localhost:8090/login?id=test&passwd=123 과 같이 url을 통해서 값을 매칭하여 전달받는다.
 *  
 * */

@RestController
@RequestMapping(value="testApi/v1.0/login") // 매핑 경로의 공통부분 (부모)
public class loginController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private LoginService loginService;
	
	@RequestMapping(value="/loginProcess", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public Map<String, Object> loginProcess(@RequestBody LoginVO loginVo, HttpServletRequest request) throws LoginProcessExeption{
		
		Map<String, Object> userInfo = new HashMap<String, Object>();

		userInfo.put("list", loginService.loginProcess(loginVo));
		
		//HttpSession session = request.getSession();
		//session.setAttribute("user", loginService.loginProcess(loginVo));
		
		return userInfo;
	}
	
	
	@RequestMapping(value="/getMenuList", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public Map<String, Object> getMenuList(Map<String, Object> params, HttpServletRequest request){
		
		System.out.println("request >> " + request.getSession());
		
		Map<String, Object> menuList = new HashMap<String, Object>();

		menuList.put("list", loginService.getMenuList(params));

		return menuList;
	}
	
	
	@RequestMapping(value="/getUser", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public Map<String, Object> getUser(LoginVO loginVo){
		
		Map<String, Object> userList = new HashMap<String, Object>();

		userList.put("data", loginService.getUser(loginVo));

		return userList;
	}
	
	
	@RequestMapping(value="/updateUser", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int getUser(@RequestBody Map<String, Object> param){
		int result = loginService.updateUser(param);
		
		return result;
	}
	
	
	@RequestMapping(value="/changePasswd", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int changePasswd(@RequestBody Map<String, Object> param) throws LoginProcessExeption{
		int result = loginService.changePasswd(param);
		return result;
	}
	
	
	@RequestMapping(value="/deleteChk", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int deleteChk(@RequestBody Map<String, Object> param) throws LoginProcessExeption{
		int result = loginService.deleteChk(param);
		return result;
	}
	
	
	@RequestMapping(value="/setSignUp", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int setSignUp(@RequestBody Map<String, Object> param) throws LoginProcessExeption{
		int result = loginService.setSignUp(param);
		return result;
	}
	
	
	@RequestMapping(value="/idCheck", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public boolean idCheck(LoginVO loginVo){
		boolean result = loginService.idCheck(loginVo);
		return result;
	}
	
	
}
