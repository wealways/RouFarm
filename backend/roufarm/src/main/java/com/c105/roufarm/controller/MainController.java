package com.c105.roufarm.controller;
import com.c105.roufarm.repository.PersonMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class MainController {

      @Autowired
      private PersonMongoDBRepository personMongoDBRepository;

      @GetMapping("/{name}")
      public ResponseEntity<String> Test(@PathVariable String name){
            System.out.println(personMongoDBRepository.findAll());
            return new ResponseEntity<String>(personMongoDBRepository.findAll().toString(),HttpStatus.OK);
      }
}
