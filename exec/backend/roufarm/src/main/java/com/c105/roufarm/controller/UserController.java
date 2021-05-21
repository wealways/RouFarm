package com.c105.roufarm.controller;

import java.util.HashMap;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.User;
import com.c105.roufarm.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("User Controller")
@RestController
@RequestMapping("/user")
public class UserController {
      @Autowired
      private UserService userService;

      @Autowired
      private JwtTokenUtil jwtTokenUtil;

      // @GetMapping("")
      // public String helloWorld() {
      //       return "Hello, world!";
      // }

      // @GetMapping("/{id}")
      // public ResponseEntity<String> dummyTest(@PathVariable String id){
      // User p = new User();
      // p.setId(id);
      // p.setProfile(new Profile());
      // HashSet<String> rset = new HashSet<String>();
      // p.setRoutine(rset);
      // return new
      // ResponseEntity<String>(userMongoDBRepository.save(p).toString(),HttpStatus.OK);
      // }

      @ApiOperation(value = "회원가입 및 로그인", notes = "회원가입 및 로그인을 할 때 사용한다. 성공하면 user에 계정 정보와, msg에 로그인한 건지 회원가입한 건지에 대한 여부와, 토큰을 함께 전달한다.")
      @PostMapping("")
      public ResponseEntity<HashMap<String, Object>> saveUser(@RequestBody HashMap<String, Object> kakaoMessage) {
            HashMap<String, Object> map = new HashMap<String, Object>();

            try {
                  User authUser = userService.findUser((String) kakaoMessage.get("id"));
                  map.put("user", authUser);
                  map.put("msg", "login");
            } catch (Exception e) {
                  User user = userService.saveUser(kakaoMessage);
                  map.put("user", user);
                  map.put("msg", "signup");
            }

            String token = jwtTokenUtil.generateToken((String) kakaoMessage.get("id"));
            map.put("token", token);

            return new ResponseEntity<HashMap<String, Object>>(map, HttpStatus.OK);
      }

      @ApiOperation(value = "회원가입 조회", notes = "토큰을 통해 본인 정보에 대한 조회를 한다.")
      @GetMapping("/")
      public ResponseEntity<User> findUser() {
            User user;
            try {
                  String id = jwtTokenUtil.getId();
                  user = userService.findUser(id);
            } catch (Exception e) {
                  user = null;
            }
            return new ResponseEntity<User>(user, HttpStatus.OK);
      }

      @ApiOperation(value = "회원 닉네임 변경 및 모드 변경", notes = "회원 닉네임 변경 및 모드")
      @PutMapping("/")
      public ResponseEntity<User> editUser(@RequestBody HashMap<String, Object> changeMassage) {
            return new ResponseEntity<User>(userService.editUser(changeMassage), HttpStatus.OK);
      } // 회원가입 및 수정
}
