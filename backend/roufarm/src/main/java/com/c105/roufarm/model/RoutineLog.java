package com.c105.roufarm.model;

import lombok.Data;

@Data
public class RoutineLog {
     private String id; // 고유 id\
     private String routineId; // 루틴의 id
     private String time; // 시각
     private String isSuccess; // 성공여부
}
