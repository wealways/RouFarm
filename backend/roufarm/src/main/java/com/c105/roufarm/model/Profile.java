package com.c105.roufarm.model;

import java.util.Date;
import java.util.HashSet;

import lombok.Data;

@Data
public class Profile {
      private String nickname;
      private int level;
      private int exp;
      private String title;
      private HashSet<String> achievement;
      private String createDate;
      private int combo;
      private String mode;

      public Profile(){}

      public Profile(String nickname){ // 새로운 프로필 생성
            this.nickname = nickname;
            this.level = 0;
            this.exp = 0;
            this.title = "";
            this.achievement = new HashSet<String>();
            Date nowDate = new Date();
            int month = nowDate.getMonth()+1;
            int date = nowDate.getDate();
            String monthString = (month>9 ? ""+month : "0"+month);
            String dateString = (date>9 ? ""+date : "0"+date);
            this.createDate = ""+(nowDate.getYear()+1900)+(monthString)+(dateString);

            this.combo = 0;
            this.mode = "soft"; // soft / hard
      }
}
