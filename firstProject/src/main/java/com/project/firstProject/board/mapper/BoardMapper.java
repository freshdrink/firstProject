package com.project.firstProject.board.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface BoardMapper {
	
	public Map<String, Object> getBoard();

}
