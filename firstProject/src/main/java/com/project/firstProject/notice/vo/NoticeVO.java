package com.project.firstProject.notice.vo;

public class NoticeVO {
	
	private int notiSeq;
	private String title;
	private String content;
	private int count;
	private String creatDt;
	private String creatId;
	private String ModiDt;
	private String ModiId;
	
	private String option;
	private String keyword;
	
	public int getNotiSeq() {
		return notiSeq;
	}
	public void setNotiSeq(int notiSeq) {
		this.notiSeq = notiSeq;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	public String getCreatDt() {
		return creatDt;
	}
	public void setCreatDt(String creatDt) {
		this.creatDt = creatDt;
	}
	
	public String getCreatId() {
		return creatId;
	}
	public void setCreatId(String creatId) {
		this.creatId = creatId;
	}
	
	public String getModiDt() {
		return ModiDt;
	}
	public void setModiDt(String modiDt) {
		ModiDt = modiDt;
	}
	
	public String getModiId() {
		return ModiId;
	}
	public void setModiId(String modiId) {
		ModiId = modiId;
	}
	
	
	public String getOption() {
		return option;
	}
	public void setOption(String option) {
		this.option = option;
	}
	
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	
	@Override
	public String toString() {
		return "NoticeVO [notiSeq=" + notiSeq + ", title=" + title + ", content=" + content + ", count=" + count
				+ ", creatDt=" + creatDt + ", creatId=" + creatId + ", ModiDt=" + ModiDt + ", ModiId=" + ModiId
				+ ", option=" + option + ", keyword=" + keyword + "]";
	}
	
}
