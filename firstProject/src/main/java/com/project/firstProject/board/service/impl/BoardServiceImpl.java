package com.project.firstProject.board.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.firstProject.board.mapper.BoardMapper;
import com.project.firstProject.board.service.BoardService;
import com.project.firstProject.board.vo.BoardVO;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardMapper boardMapper;

	@Override
	public Map<String, Object> getBoard(BoardVO boardVo) {
		System.out.println("override 유지");
		Map<String, Object> test = new HashMap<String, Object>();
		
		test.put("testList", boardMapper.getBoard(boardVo));
		
		return test;
	}

}
