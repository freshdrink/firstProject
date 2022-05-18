package com.project.firstProject.notice.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.firstProject.notice.vo.NoticeVO;

@Mapper
public interface NoticeMapper {
	
	public int getNoticeCnt(NoticeVO noticeVo);
	
	public List<NoticeVO> getNoticeList(NoticeVO noticeVo);

}
