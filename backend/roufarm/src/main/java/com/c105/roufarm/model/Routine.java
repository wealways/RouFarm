package com.c105.roufarm.model;

import java.util.HashSet;

import lombok.Data;

@Data
public class Routine {
     private String id; // 고유 id
     private String content; // 내용
     private String category; // 분류
     private String startTime; // 시작시간
     private HashSet<String> routineLog; // 루틴 로그 id 집합
     private String QR; // QR?
     private String isQR; // QR의 존재 여부
     private String isAlarm; // 알람 존재 여부
     private String isNotice; // 알림 존재 여부
}
