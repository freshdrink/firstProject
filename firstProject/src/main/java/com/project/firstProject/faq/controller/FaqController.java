package com.project.firstProject.faq.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstProject.faq.service.FaqService;
import com.project.firstProject.faq.vo.FaqVO;

@RestController
@RequestMapping(value="testApi/v1.0/faq") // 매핑 경로의 공통부분
public class FaqController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private FaqService faqService;
	
	@RequestMapping(value="/getFaqList", method=RequestMethod.GET)
	public Map<String, Object> getFaqList(FaqVO faqVo){
		logger.info("getFaqList");
		
		List<FaqVO> list = faqService.getFaqList(faqVo);
		
		Map<String, Object> param = new HashMap<String, Object>();
		
		param.put("list", list);
		param.put("total", faqService.getFaqListCount(faqVo));
		
		return param;
	}

}
