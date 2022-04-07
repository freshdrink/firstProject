package com.project.firstProject.login.service;

import java.util.List;
import java.util.Map;

import com.project.firstProject.exception.LoginProcessExeption;
import com.project.firstProject.login.vo.LoginVO;
import com.project.firstProject.login.vo.MenuVO;

public interface LoginService {

	public Map<String, Object> loginProcess(LoginVO loginVo) throws LoginProcessExeption;
	
	public Boolean pwdCheck(String inpPwd, String chkPwd);
	
	public List<MenuVO> getMenuList(Map<String, Object> params);
	
	public Map<String, Object> getUser(LoginVO loginVo);
	
	public int updateUser(Map<String, Object> param);
	
}
