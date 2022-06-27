package com.project.firstProject.faq.vo;

public class FaqVO {

	private int faqSeq;
	private String title;
	private String content;
	private String creatDt;
	private String creatId;
	private String ModiDt;
	private String ModiId;
	
	private String option;
	private String keyword;
	private int limit;
	private int offset;
	
	
	public int getFaqSeq() {
		return faqSeq;
	}
	public void setFaqSeq(int faqSeq) {
		this.faqSeq = faqSeq;
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
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
	
	
	@Override
	public String toString() {
		return "FaqVO [faqSeq=" + faqSeq + ", title=" + title + ", content=" + content
				+ ", creatDt=" + creatDt + ", creatId=" + creatId + ", ModiDt=" + ModiDt + ", ModiId=" + ModiId
				+ ", option=" + option + ", keyword=" + keyword + ", limit=" + limit + ", offset=" + offset + "]";
	}
	
	
	
}
