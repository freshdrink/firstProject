package com.project.firstProject.notice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.firstProject.notice.mapper.NoticeMapper;
import com.project.firstProject.notice.service.NoticeService;
import com.project.firstProject.notice.vo.NoticeVO;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	NoticeMapper noticeMapper;
	
	@Override
	public int getNoticeCnt(NoticeVO noticeVo) {
		return noticeMapper.getNoticeCnt(noticeVo);
	}

	@Override
	public List<NoticeVO> getNoticeList(NoticeVO noticeVo) {
		return noticeMapper.getNoticeList(noticeVo);
	}

	@Override
	public NoticeVO getNoticeDetail(NoticeVO noticeVo) {
		return noticeMapper.getNoticeDetail(noticeVo);
	}

	@Override
	public int noticeInsert(NoticeVO noticeVo) {
		return noticeMapper.noticeInsert(noticeVo);
	}

	@Override
	public int noticeUpdate(NoticeVO noticeVo) {
		return noticeMapper.noticeUpdate(noticeVo);
	}

}
