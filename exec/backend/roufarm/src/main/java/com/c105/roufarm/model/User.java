package com.c105.roufarm.model;

import java.util.HashSet;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("User")
@Data
public class User {
      private String id;
      private Profile profile;
      private HashSet<String> routines;
}
