package com.c105.roufarm.controller;

import java.util.ArrayList;
import java.util.HashMap;

import com.c105.roufarm.service.ProfileWebService;
import com.c105.roufarm.service.UserLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("RoutineLog Controller")
@RestController
@RequestMapping("/profileWeb")
public class ProfileWebController {

      @Autowired
      UserLogService userLogService;

      @Autowired
      ProfileWebService profileWebService;

      @ApiOperation(value = "루틴 로그 잔디 형식 조회",notes = "경로로 주어진 Id의 모든 루틴 로그를 잔디형식으로 조회한다.")
      @GetMapping("/{id}")
      public ResponseEntity<HashMap<String,Object>> getUserProfile(@PathVariable String id) throws Exception{
            return new ResponseEntity<HashMap<String,Object>>(profileWebService.findProfileMap(id),HttpStatus.OK); 
      }
      
      @ApiOperation(value = "루틴 로그 잔디 형식 조회",notes = "경로로 주어진 Id의 모든 루틴 로그를 잔디형식으로 조회한다.")
      @GetMapping("/grass/{id}")
      public ResponseEntity<HashMap<String,ArrayList<Integer>>> getRoutineLogForGrass(@PathVariable String id) {
            return new ResponseEntity<HashMap<String,ArrayList<Integer>>>(userLogService.findLogForGrass(id),HttpStatus.OK); 
      }
}
