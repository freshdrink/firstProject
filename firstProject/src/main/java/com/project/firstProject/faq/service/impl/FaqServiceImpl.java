package com.project.firstProject.faq.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.firstProject.faq.mapper.FaqMapper;
import com.project.firstProject.faq.service.FaqService;
import com.project.firstProject.faq.vo.FaqVO;

@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	FaqMapper faqMapper;
	
	@Override
	public List<FaqVO> getFaqList(FaqVO faqVo) {
		return faqMapper.getFaqList(faqVo);
	}

	@Override
	public int getFaqListCount(FaqVO faqVo) {
		return faqMapper.getFaqListCount(faqVo);
	}

}
