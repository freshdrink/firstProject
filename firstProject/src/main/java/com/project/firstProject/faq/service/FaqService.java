package com.project.firstProject.faq.service;

import java.util.List;

import com.project.firstProject.faq.vo.FaqVO;

public interface FaqService {

	public List<FaqVO> getFaqList(FaqVO faqVo);
	
	public int getFaqListCount(FaqVO faqVo);
	
}
