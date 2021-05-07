package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.RoutineLog;
import com.c105.roufarm.model.UserLog;
import com.c105.roufarm.repository.UserLogMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserLogService {
      
      @Autowired
      UserLogMongoDBRepository userLogMongoDBRepository;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      // 1. 헤더로 해당 id 찾기
      @Transactional
      public UserLog findUserLogById(){
            String id = jwtTokenUtil.getId();
            return userLogMongoDBRepository.findById(id).get();
      }

      // 2. 헤더로 해당 id 모든 로그 찾기
      @Transactional
      public List<String> findLogAll(){
            HashMap<String,Object> days = findUserLogById().getDays();
            HashSet<Object> logSet = (HashSet<Object>) days.values();
            List<String> userLogSet = new ArrayList<String>();
            for(Object log:logSet){
                  userLogSet.add((String)log);
            }
            return userLogSet;
      }

      // 3. 현재 헤더에 새로운 루틴 로그 추가
      @Transactional
      public UserLog saveLog(RoutineLog routineLog){
            UserLog userLog = findUserLogById();
            HashMap<String,Object> days = userLog.getDays();
            String getDate = routineLog.getTime();
            HashSet<String> userLogSet = (HashSet<String>)days.get(getDate);
            if (userLogSet == null){
                  userLogSet = new HashSet<String>();
            }
            userLogSet.add(routineLog.getId());
            days.put(getDate, userLogSet);
            userLog.setDays(days);
            userLogMongoDBRepository.save(userLog);
            return userLogMongoDBRepository.findById(userLog.getId()).get();
      }

}
