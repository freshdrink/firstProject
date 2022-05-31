package com.project.firstProject.notice.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.firstProject.notice.vo.NoticeVO;

@Mapper
public interface NoticeMapper {
	
	public List<NoticeVO> getNoticeList(NoticeVO noticeVo);
	
	public int getNoticeCnt(NoticeVO noticeVo);
	
	public NoticeVO getNoticeDetail(NoticeVO noticeVo);
	
	public void noticeCount(NoticeVO noticeVo);
	
	public int noticeInsert(NoticeVO noticeVo);
	
	public int noticeUpdate(NoticeVO noticeVo);
	
	public int noticeDelete(NoticeVO noticeVo);

}
