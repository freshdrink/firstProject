package com.project.firstProject.login.vo;

public class MenuVO {

	//@ApiModelProperty(value="번호")
	private String menuSeq;
	private String menuId;
	private String menuName;
	
	public String getMenuSeq() {
		return menuSeq;
	}
	public void setMenuSeq(String menuSeq) {
		this.menuSeq = menuSeq;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	
	
	@Override
	public String toString() {
		return "MenuVO [menuSeq=" + menuSeq + ", menuId=" + menuId + ", menuName=" + menuName + "]";
	}
	
}
