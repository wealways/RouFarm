package com.c105.roufarm.controller;

import java.util.List;

import com.c105.roufarm.model.RoutineLog;
import com.c105.roufarm.service.RoutineLogService;
import com.c105.roufarm.service.RoutineService;
import com.c105.roufarm.service.UserLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("RoutineLog Controller")
@RestController
@RequestMapping("/routineLog")
public class RoutineLogController {
      
      @Autowired
      RoutineLogService routineLogService;

      @Autowired
      UserLogService userLogService;

      @Autowired
      RoutineService routineService;

      @ApiOperation(value = "루틴 로그 등록",notes = "받아온 객체로 루틴 로그를 생성한다.")
      @PostMapping("/")
      public ResponseEntity<RoutineLog> saveRoutineLog(@RequestBody RoutineLog routineLog) {
            return new ResponseEntity<RoutineLog>(routineLogService.saveRoutineLog(routineLog),HttpStatus.OK); 
      }

      @ApiOperation(value = "모든 루틴 로그 조회",notes = "해당 User의 모든 루틴 로그 조회합니다.")
      @GetMapping("/")
      public ResponseEntity<List<RoutineLog>> findRoutineLog() {
            return new ResponseEntity<List<RoutineLog>>(routineLogService.findRoutineLogList(),HttpStatus.OK); 
      }

      @ApiOperation(value = "모든 루틴 로그 조회2",notes = "해당 User의 모든 루틴 로그 조회합니다. 단, 날짜별로 표현합니다.")
      @GetMapping("/month/")
      public ResponseEntity<List<String>> findRoutineLogOrderMonth() {
            return new ResponseEntity<List<String>>(userLogService.findLogAll(),HttpStatus.OK);
      }
      
      @ApiOperation(value = "루틴 로그 조회",notes = "해당 Id의 모든 루틴 로그를 조회한다.")
      @GetMapping("/{routineLogId}")
      public ResponseEntity<RoutineLog> getRoutineByUser(@PathVariable String routineLogId) {
            return new ResponseEntity<RoutineLog>(routineLogService.findRoutineLog(routineLogId),HttpStatus.OK); 
      }

      

}

