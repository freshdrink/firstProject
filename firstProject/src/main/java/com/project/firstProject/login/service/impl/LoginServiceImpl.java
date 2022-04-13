package com.project.firstProject.login.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.firstProject.exception.LoginProcessExeption;
import com.project.firstProject.login.mapper.LoginMapper;
import com.project.firstProject.login.service.LoginService;
import com.project.firstProject.login.vo.LoginVO;
import com.project.firstProject.login.vo.MenuVO;
import com.project.firstProject.security.AES256Util;

import ch.qos.logback.core.net.SyslogOutputStream;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	LoginMapper loginMapper;
	
	@Override
	public Map<String, Object> loginProcess(LoginVO loginVo) throws LoginProcessExeption {

		Map<String, Object> login = loginMapper.login(loginVo);
		
		boolean passFailChk = false;
		
		if(login != null) {
			passFailChk = pwdCheck(loginVo.getPasswd(), (String)login.get("passwd"));
		}else {
			throw new LoginProcessExeption("사용자 아이디를 다시 확인해주세요.");
		}
		
		if((int)login.get("loginfailcnt") < 5) {
			if(!passFailChk) {
				loginMapper.loginFail(loginVo.getUserId());
				throw new LoginProcessExeption("패스워드를 다시 확인해주세요.");
			}else {
				loginMapper.loginReset(loginVo.getUserId());
			}
		}else {
			throw new LoginProcessExeption("5회 이상 패스워드 오류로 새 비밀번호를 설정해주세요.");
		}
		
		return login;
	}

	@Override
	public Boolean pwdCheck(String inpPwd, String chkPwd) {
		/* inpPwd: 받아온값  / chkPwd : 비교할거 */
		if(inpPwd == null || inpPwd.length() == 0) {
			return false;
		}		
		if(chkPwd == null || chkPwd.length() == 0) {
			return false;
		}
		
		String pw = AES256Util.encrypt(inpPwd);
		
		boolean isEquals = pw.equals(chkPwd);
		return isEquals;
	}

	@Override
	public List<MenuVO> getMenuList(Map<String, Object> params) {
		return loginMapper.getMenuList(params);
	}

	@Override
	public Map<String, Object> getUser(LoginVO loginVo) {
		return loginMapper.getUser(loginVo);
	}

	@Override
	public int updateUser(Map<String, Object> param) {
		return loginMapper.updateUser(param);
	}

	@Override
	public int changePasswd(Map<String, Object> param) throws LoginProcessExeption {
		
		LoginVO loginVo = new LoginVO();
		loginVo.setUserId((String)param.get("userid"));
		
		Map<String, Object> login = loginMapper.login(loginVo);
		
		Boolean pwdFailChk = pwdCheck((String)param.get("passwd"), (String)login.get("passwd"));

		if(!pwdFailChk) {
			throw new LoginProcessExeption("패스워드를 다시 확인해주세요.");
		}else if(!param.get("newPwd").equals(param.get("pwdChk"))){
			throw new LoginProcessExeption("패스워드가 일치하지 않습니다.");
		}
		
		param.put("newPasswd", AES256Util.encrypt((String)param.get("newPwd")));
		
		return loginMapper.changePasswd(param);
	}

	@Override
	public int deleteChk(Map<String, Object> param) throws LoginProcessExeption {
		
		LoginVO loginVo = new LoginVO();
		loginVo.setUserId((String)param.get("userid"));
		
		Map<String, Object> login = loginMapper.login(loginVo);
		
		Boolean pwdFailChk = pwdCheck((String)param.get("passwd"), (String)login.get("passwd"));
		
		if(!pwdFailChk) {
			throw new LoginProcessExeption("패스워드를 다시 확인해주세요.");
		}
		
		return loginMapper.deleteChk(param);
	}

	@Override
	public int setSignUp(Map<String, Object> param) throws LoginProcessExeption {
		
		if(!param.get("passwd").equals(param.get("passwdChk"))){
			throw new LoginProcessExeption("패스워드가 일치하지 않습니다.");
		}
		
		param.put("password", AES256Util.encrypt((String)param.get("passwd")));
				
		return loginMapper.setSignUp(param);
	}

	@Override
	public boolean idCheck(LoginVO loginVo){
		boolean result = false;
		Map<String, Object> login = loginMapper.login(loginVo);

		if(login != null) {
			result = true; 
		}

		return result;
	}

}
