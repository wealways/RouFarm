package com.c105.roufarm.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.User;
import com.c105.roufarm.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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

      @GetMapping("")
      public ResponseEntity<User> findUser() {
            User user;
            try {
                  HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                              .currentRequestAttributes()).getRequest();
                  String token = request.getHeader("Authorization");
                  String id = jwtTokenUtil.getUsernameFromToken(token);
                  user = userService.findUser(id);
            } catch (Exception e) {
                  user = null;
            }
            return new ResponseEntity<User>(user, HttpStatus.OK);
      }

      @PutMapping("/{id}")
      public ResponseEntity<User> editUser(@PathVariable String id,
                  @RequestBody HashMap<String, Object> changeMassage) {
            return new ResponseEntity<User>(userService.editUser(id, changeMassage), HttpStatus.OK);
      } // 회원가입 및 수정
}
