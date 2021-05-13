package com.c105.roufarm.controller;

import java.util.HashMap;

import com.c105.roufarm.service.ReportPageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("Report Controller")
@RestController
@RequestMapping("/report")
public class ReportPageController {

      @Autowired
      ReportPageService reportPageService;

      @ApiOperation(value = "monthAPI 에 반환할 값, 잔디와 해쉬태그별 통계자료를 반환한다.",notes = "리포트 페이지에 들어갈 통계자료로 잔디와 해쉬태그별 통계자료를 반환한다.")
      @GetMapping("/monthAPI/")
      public ResponseEntity<HashMap<String,Object>> getMonthAPI() throws Exception{
            return new ResponseEntity<HashMap<String,Object>>(reportPageService.findReportForGrassAndHashtag(),HttpStatus.OK); 
      }
}
