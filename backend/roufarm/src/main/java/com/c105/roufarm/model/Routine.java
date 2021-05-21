package com.c105.roufarm.model;

import java.util.HashSet;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Routine {
     private @Id String uuid; // 고유 id
     private String kakaoId; // 카카오 id
     private String startDate; // 시작하는 날짜
     private String questName; // 내용
     private String alarmTime; // 알람 시간
     private String startTime; // 시작시간
     private String endTime; // 끝시간
     private List<String> repeatYoilList; // 요일 리스트
     private String category; // 분류
     private String isQR; // QR존재 여부

     private HashSet<String> routineLog; // 루틴 로그 id 집합
     private String isActivate; // 활성화여부
     private String isDo; // 오늘했는지?
}
