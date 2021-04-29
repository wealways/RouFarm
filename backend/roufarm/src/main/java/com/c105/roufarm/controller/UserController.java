package com.c105.roufarm.controller;

import java.util.HashMap;
import java.util.HashSet;

import com.c105.roufarm.model.Profile;
import com.c105.roufarm.model.User;
import com.c105.roufarm.repository.UserMongoDBRepository;
import com.c105.roufarm.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

      @Autowired
      private UserMongoDBRepository userMongoDBRepository;

      @Autowired
      private UserService userService;

      @GetMapping("")
      public String helloWorld(){
            return "Hello, world!";
      }

      // @GetMapping("/{id}")
      // public ResponseEntity<String> dummyTest(@PathVariable String id){
      //       User p = new User();
      //       p.setId(id);
      //       p.setProfile(new Profile());
      //       HashSet<String> rset = new HashSet<String>();
      //       p.setRoutine(rset);
      //       return new ResponseEntity<String>(userMongoDBRepository.save(p).toString(),HttpStatus.OK);
      // }

      @PostMapping("")
      public ResponseEntity<User> saveUser(@RequestBody HashMap<String,Object> kakaoMessage){
            return new ResponseEntity<User>(userService.saveUser(kakaoMessage),HttpStatus.OK);
      }

      @GetMapping("/{id}")
      public ResponseEntity<User> findUser(@PathVariable String id){
            return new ResponseEntity<User>(userService.findUser(id),HttpStatus.OK);
      }

      @PutMapping("/{id}")
      public ResponseEntity<User> editUser(@PathVariable String id, @RequestBody HashMap<String,Object> changeMassage){
            return new ResponseEntity<User>(userService.editUser(id, changeMassage),HttpStatus.OK);
      }

}
