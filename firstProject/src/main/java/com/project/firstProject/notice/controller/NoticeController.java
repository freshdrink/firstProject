package com.project.firstProject.notice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstProject.notice.service.NoticeService;
import com.project.firstProject.notice.vo.NoticeVO;

@RestController
@RequestMapping(value="testApi/v1.0/notice") // 매핑 경로의 공통부분 (부모)
public class NoticeController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired // 필드 주입식
	private NoticeService noticeService;
	
	@RequestMapping(value="/getNoticeList", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public Map<String, Object> getNoticeList(NoticeVO noticeVo){
		logger.info("getNoticeList");

		List<NoticeVO> list = noticeService.getNoticeList(noticeVo);
		
		Map<String, Object> param = new HashMap<String, Object>();
		
		param.put("list", list);
		param.put("total", noticeService.getNoticeCnt(noticeVo));
		
		return param;
	}
	
	@RequestMapping(value="/getNoticeDetail", method=RequestMethod.GET) // 매핑 경로의 공통부분 (자식)
	public NoticeVO getNoticeDetail(NoticeVO noticeVo){
		logger.info("getNoticeDetail");
		return noticeService.getNoticeDetail(noticeVo);
	}
	
	@RequestMapping(value="/noticeInsert", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int noticeInsert(@RequestBody NoticeVO noticeVo){
		logger.info("noticeInsert");
		return noticeService.noticeInsert(noticeVo);
	}
	
	@RequestMapping(value="/noticeUpdate", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int noticeUpdate(@RequestBody NoticeVO noticeVo){
		logger.info("noticeUpdate");
		return noticeService.noticeUpdate(noticeVo);
	}
	
	@RequestMapping(value="/noticeDelete", method=RequestMethod.POST) // 매핑 경로의 공통부분 (자식)
	public int noticeDelete(@RequestBody NoticeVO noticeVo){
		logger.info("noticeDelete");
		return noticeService.noticeDelete(noticeVo);
	}
	

}
