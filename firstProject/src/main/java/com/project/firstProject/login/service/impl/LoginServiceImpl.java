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
		if(inpPwd == null || inpPwd.length() == 0) {
			return false;
		}		
		if(chkPwd == null || chkPwd.length() == 0) {
			return false;
		}
		
		boolean isEquals = inpPwd.equals(chkPwd);
		return isEquals;
	}

}
