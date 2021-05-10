package com.c105.roufarm.model;

import java.util.HashSet;

import lombok.Data;

@Data
public class Routine {
     private String id; // 고유 id
     private String kakaoId; // 카카오 id
     private String title; // 내용
     private String category; // 분류
     private String startDate; // 시작하는 날짜
     private String startTime; // 시작시간
     private String endTime; // 끝시간
     private HashSet<String> routineLog; // 루틴 로그 id 집합
     private String isQR; // QR의 존재 여부
     private String isAlarm; // 알람 존재 여부
     private String alarmTime; // 알람 시간
     private String isNotice; // 알림 존재 여부
     private String isActivate; // 활성화여부
}
