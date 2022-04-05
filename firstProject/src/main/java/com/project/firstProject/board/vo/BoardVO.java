package com.project.firstProject.board.vo;

public class BoardVO {
	
	private String seq;
	private String title;
	private String createId;
	private String createDt;
	private String content;
	
	
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCreateId() {
		return createId;
	}
	public void setCreateId(String createId) {
		this.createId = createId;
	}
	public String getCreateDt() {
		return createDt;
	}
	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
	@Override
	public String toString() {
		return "BoardVO [seq=" + seq + ", title=" + title + ", createId=" + createId + ", createDt=" + createDt
				+ ", content=" + content + "]";
	}
	

}
