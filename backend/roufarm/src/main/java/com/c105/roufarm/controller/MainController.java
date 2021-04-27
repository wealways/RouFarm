package com.c105.roufarm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class MainController {

      @GetMapping("")
      public String Test() {
            return "Hello? 전에 있던 자바는 죽었나요?";
      }
}
