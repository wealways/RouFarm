package com.c105.roufarm.model;

import java.util.HashMap;

import lombok.Data;

@Data
public class UserLog {
      String id; // 카카오 id와 동일한 id
      HashMap<String, Object> days; // key는 날짜, value는 로그들
}
