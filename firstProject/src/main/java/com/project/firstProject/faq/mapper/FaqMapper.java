package com.project.firstProject.faq.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.firstProject.faq.vo.FaqVO;

@Mapper
public interface FaqMapper {

	public List<FaqVO> getFaqList(FaqVO faqVo);
	
	public int getFaqListCount(FaqVO faqVo);

}
