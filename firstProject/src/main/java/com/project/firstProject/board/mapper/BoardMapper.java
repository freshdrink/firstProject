package com.project.firstProject.board.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.firstProject.board.vo.BoardVO;


@Mapper
public interface BoardMapper {
	
	public Map<String, Object> getBoard(BoardVO boardVo);

}
