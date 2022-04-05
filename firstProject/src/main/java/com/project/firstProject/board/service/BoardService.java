package com.project.firstProject.board.service;

import java.util.Map;

import com.project.firstProject.board.vo.BoardVO;

public interface BoardService {

	public Map<String,Object> getBoard(BoardVO boardVo);
	
}
