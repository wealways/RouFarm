package com.c105.roufarm.model;

import java.util.HashSet;

import lombok.Data;

@Data
public class Profile {
      private String nickname;
      private int level;
      private int exp;
      private String title;
      private HashSet<String> achievement;
      private int combo;
      private String mode;

      public Profile(){}

      public Profile(String nickname){ // 새로운 프로필 생성
            this.nickname = nickname;
            this.level = 0;
            this.exp = 0;
            this.title = "";
            this.achievement = new HashSet<String>();
            this.combo = 0;
            this.mode = "soft"; // soft / hard
      }
}
