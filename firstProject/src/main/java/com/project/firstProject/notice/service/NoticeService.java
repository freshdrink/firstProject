package com.project.firstProject.notice.service;

import java.util.List;

import com.project.firstProject.notice.vo.NoticeVO;

public interface NoticeService {

	public List<NoticeVO> getNoticeList(NoticeVO noticeVo);
	
	public int getNoticeCnt(NoticeVO noticeVo);
	
	public NoticeVO getNoticeDetail(NoticeVO noticeVo);
	
	public int noticeInsert(NoticeVO noticeVo);
	
	public int noticeUpdate(NoticeVO noticeVo);
	
	public int noticeDelete(NoticeVO noticeVo);
	
}
