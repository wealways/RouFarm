package com.c105.roufarm.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("Person")
@Data
public class Person {
      private String id;
      private String name;
      private String job;
}
