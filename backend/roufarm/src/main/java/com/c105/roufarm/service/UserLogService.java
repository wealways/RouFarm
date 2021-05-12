package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.RoutineLog;
import com.c105.roufarm.model.UserLog;
import com.c105.roufarm.repository.RoutineLogMongoDBRepository;
import com.c105.roufarm.repository.UserLogMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserLogService {
      
      @Autowired
      UserLogMongoDBRepository userLogMongoDBRepository;

      @Autowired
      RoutineLogService routineLogService;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      // 1. 헤더로 해당 id 찾기
      @Transactional
      public UserLog findUserLogById(){
            String id = jwtTokenUtil.getId();
            Optional<UserLog> opt = userLogMongoDBRepository.findById(id);
            UserLog userLog;
            System.out.println(opt);
            if(opt.isEmpty()){
                  userLog = new UserLog();
                  userLog.setId(id);
                  userLog.setDays(new HashMap<String,Object>());
            }
            else{
                  userLog = opt.get();
            }
            return userLog;
      }

      // 2. 헤더로 해당 id 모든 로그 찾기
      @Transactional
      public List<RoutineLog> findLogAll(){
            HashMap<String,Object> days = findUserLogById().getDays();
            Collection<Object> logSet = (Collection<Object>) days.values();
            List<RoutineLog> userLogSet = new ArrayList<RoutineLog>();
            for(Object daylog:logSet){
                  ArrayList<String> daylist = (ArrayList<String>)daylog;
                  for(String log: daylist){
                        userLogSet.add(routineLogService.findRoutineLog(log));
                  }
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
