package com.c105.roufarm.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import com.c105.roufarm.service.ReportPageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
      public ResponseEntity<ArrayList<HashMap<String,Object>>> getMonthAPI() throws Exception{
            return new ResponseEntity<ArrayList<HashMap<String,Object>>>(reportPageService.findReportMonth(),HttpStatus.OK); 
      }

      @ApiOperation(value = "dailyAPI 에 반환할 값, 일별 로그에 대한 정보를 반환한다.",notes = "리포트 페이지에 들어갈 통계자료로 해당 날짜를 받아 그 날짜에 기록된 로그를 반환한다.")
      @GetMapping("/dailyAPI/{getDate}")
      public ResponseEntity<HashSet<HashMap<String,Object>>> getdailyAPI(@PathVariable String getDate) {
            return new ResponseEntity<HashSet<HashMap<String,Object>>>(reportPageService.findReportDaily(getDate),HttpStatus.OK); 
      }

      @ApiOperation(value = "weekAPI에 반환할 값, 주간 로그에 대한 정보를 반환한다.",notes = "리포트 페이지에 들어갈 통계자료로 주간 통계자료 (실패리스트와 요일별평균)을 반환한다.")
      @GetMapping("/weekAPI/")
      public ResponseEntity<ArrayList<HashMap<String,Object>>> getweekAPI(){
            return new ResponseEntity<ArrayList<HashMap<String,Object>>>(reportPageService.findReportWeek(),HttpStatus.OK);
      }

      @ApiOperation(value = "weekAPI에 반환할 키값을 반환한다.",notes = "날짜들을 반환한다.")
      @GetMapping("/weekAPI/key")
      public ResponseEntity<ArrayList<String>> getweekKeyAPI(){
            return new ResponseEntity<ArrayList<String>>(reportPageService.findLogWeek(),HttpStatus.OK);
      }
}
