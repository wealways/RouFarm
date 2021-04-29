package com.c105.roufarm.model;

import java.util.HashSet;

import lombok.Data;

@Data
public class Routine {
     private String id;
     private String content;
     private String category;
     private String startTime;
     private String endTime;
     private HashSet<String> routineLog;
     private String QR;
     private String isQR;
     private String isAlarm;
     private String isNotice;
}
