package com.c105.roufarm.controller;

import java.util.HashMap;
import java.util.List;

import com.c105.roufarm.model.Routine;
import com.c105.roufarm.service.RoutineService;
import com.c105.roufarm.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("Routine Controller")
@RestController
@RequestMapping("/routine")
public class RoutineController {
      
      @Autowired
      RoutineService routineService;

      @Autowired
      UserService userService;

      @ApiOperation(value = "루틴 등록",notes = "받아온 객체로 루틴을 생성한다.")
      @PostMapping("/")
      public ResponseEntity<List<Routine>> saveUser(@RequestBody Routine routine) {
            routineService.saveRoutine(routine);
            userService.addUserRoutine(routine);
            return new ResponseEntity<List<Routine>>(routineService.findRoutine(),HttpStatus.OK); 
      }

      @ApiOperation(value = "루틴 조회",notes = "해당 Id의 모든 루틴을 조회한다.")
      @GetMapping("/")
      public ResponseEntity<List<Routine>> getUser() {
            return new ResponseEntity<List<Routine>>(routineService.findRoutine(),HttpStatus.OK); 
      }

}
