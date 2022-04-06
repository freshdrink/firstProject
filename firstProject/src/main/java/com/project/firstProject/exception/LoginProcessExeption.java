package com.project.firstProject.exception;

public class LoginProcessExeption extends Exception{
	
	/**
	 * 
	 * 자바의 역/직렬화를 위해서 serialVersionUID를 설정해줌.
	 * 자바의 직렬화와 역직렬화란?
	 * - 직렬화 : 자바 시스템에서 사용되는 객체나 데이터를 외부의 자바 시스템에서도 사용할수 있도록 byte 형태로 변환하는 기술
	 * - 역직렬화 : 외부의 자바시스템에서 변환된 byte를 사용할 수 있도록, 다시 객체나 데이터로 변환하는 기술
	 * 
	 */
	private static final long serialVersionUID = 6635126798984032944L;

	public LoginProcessExeption() {
		
	}
	
	public LoginProcessExeption(String msg){
		super(msg);
	}

}
