package com.project.firstProject.login.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.firstProject.login.vo.LoginVO;
import com.project.firstProject.login.vo.MenuVO;

@Mapper
public interface LoginMapper {

	public Map<String, Object> login(LoginVO loginVo);
	
	public void loginFail(String userId);
	
	public void loginReset(String userId);
	
	public List<MenuVO> getMenuList(Map<String, Object> params);
	
	public Map<String, Object> getUser(LoginVO loginVo);
	
	public int updateUser(Map<String, Object> param);
	
	public int changePasswd(Map<String, Object> param);
	
}
