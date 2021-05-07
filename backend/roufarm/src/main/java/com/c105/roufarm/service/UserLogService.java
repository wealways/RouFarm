package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.UserLog;
import com.c105.roufarm.repository.UserLogMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLogService {
      
      @Autowired
      UserLogMongoDBRepository userLogMongoDBRepository;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      // 헤더로 해당 id 찾기
      public UserLog findUserLogById(){
            String id = jwtTokenUtil.getId();
            return userLogMongoDBRepository.findById(id).get();
      }

      // 헤더로 해당 id 모든 로그 찾기
      public List<String> findLogs(){
            HashMap<String,Object> days = findUserLogById().getDays();
            HashSet<Object> logSet = (HashSet<Object>) days.values();
            List<String> userLogSet = new ArrayList<String>();
            for(Object log:logSet){
                  userLogSet.add((String)log);
            }
            return userLogSet;
      }

}
