package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.Routine;
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
      RoutineLogService routineLogService;

      @Autowired
      RoutineService routineService;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      static HashMap<String,Integer> calendar = new HashMap<String,Integer>();
      static{
            calendar.put("01",31);
            calendar.put("02",29);
            calendar.put("03",31);
            calendar.put("04",30);
            calendar.put("05",31);
            calendar.put("06",30);
            calendar.put("07",31);
            calendar.put("08",31);
            calendar.put("09",30);
            calendar.put("10",31);
            calendar.put("11",30);
            calendar.put("12",31);
      };

      // 1. 헤더로 해당 id 찾기
      @Transactional
      public UserLog findUserLogById(){
            String id = jwtTokenUtil.getId();
            Optional<UserLog> opt = userLogMongoDBRepository.findById(id);
            UserLog userLog;
            try{
                  userLog = opt.get();
            }
            catch(Exception e){
                  userLog = new UserLog();
                  userLog.setId(id);
                  userLog.setDays(new HashMap<String,Object>());
            }
            return userLog;
      }

      //1-1 토큰없이 헤더로 해당 id 찾기
      @Transactional
      public UserLog findUserLogById(String userId){
            String id = userId;
            Optional<UserLog> opt = userLogMongoDBRepository.findById(id);
            UserLog userLog;
            try{
                  userLog = opt.get();
            }
            catch(Exception e){
                  userLog = new UserLog();
                  userLog.setId(id);
                  userLog.setDays(new HashMap<String,Object>());
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
            ArrayList<String> userLogSet = (ArrayList<String>)days.get(getDate);
            if (userLogSet == null){
                  userLogSet = new ArrayList<String>();
            }
            userLogSet.add(routineLog.getId());
            days.put(getDate, userLogSet);
            userLog.setDays(days);
            userLogMongoDBRepository.save(userLog);
            return userLogMongoDBRepository.findById(userLog.getId()).get();
      }

      // 4. 현재 헤더에 로그를 날짜 형식으로 표현
      @Transactional
      public HashMap<String,HashSet<RoutineLog>> findLogAllDate(){
            HashMap<String,Object> days = findUserLogById().getDays();
            Set<String> logKeySet = days.keySet();
            HashMap<String,HashSet<RoutineLog>> userLogSet = new HashMap<>();
            for(String logKey : logKeySet){
                  Object logArray = days.get(logKey);
                  HashSet<RoutineLog> routineLogs = new HashSet<RoutineLog>();
                  for(String log: (List<String>)logArray){
                        routineLogs.add(routineLogService.findRoutineLog(log));
                  }
                  userLogSet.put(logKey,routineLogs);
            }
            return userLogSet;
      }

      // 5. 현재 헤더에 로그를 달 형식으로 표현 (상세) : 명세
      @Transactional
      public HashMap<String,HashSet<RoutineLog>> findLogAllMonth(){
            HashMap<String,Object> days = findUserLogById().getDays();
            return findLogAllMonthBase(days);
      }

      // 5-1. 현재 헤더에 로그를 달 형식으로 표현 // 토큰 없이 조회하는 버전 : 명세
      @Transactional
      public HashMap<String,HashSet<RoutineLog>> findLogAllMonth(String userId){
            HashMap<String,Object> days = findUserLogById(userId).getDays();
            return findLogAllMonthBase(days);
      }

      // 5. 현재 헤더에 로그를 달 형식으로 표현 ( 잔디 형식 ) : 명세
      @Transactional
      public HashMap<String,ArrayList<Integer>> findLogForGrass(){
            HashMap<String,HashSet<RoutineLog>> userLogMap = findLogAllMonth();
            return findLogForGrassBase(userLogMap);
      }

      // 5-1. 현재 헤더에 로그를 달 형식으로 표현 ( 잔디 형식 ) // 토큰 없이 조회하는 버전 : 명세
      @Transactional
      public HashMap<String,ArrayList<Integer>> findLogForGrass(String userId){
            HashMap<String,HashSet<RoutineLog>> userLogMap = findLogAllMonth(userId);
            return findLogForGrassBase(userLogMap);
      }

      // 5-1. 현재 헤더에 로그를 달 형식으로 표현 (상세)
      @Transactional
      public HashMap<String,HashSet<RoutineLog>> findLogAllMonthBase(HashMap<String,Object> days){
            Set<String> logKeySet = days.keySet();
            HashMap<String,HashSet<RoutineLog>> userLogMap = new HashMap<>();
            for(String logKey : logKeySet){
                  List<String> logArray = (List<String>)days.get(logKey);
                  System.out.println(logArray);
                  HashSet<RoutineLog> routineLogs = new HashSet<RoutineLog>();
                  String month = logKey.substring(3,5);
                  String year = logKey.substring(6);
                  for(String log: logArray){
                        routineLogs =  userLogMap.get(year+"-"+month);
                        if (routineLogs == null){
                              routineLogs = new HashSet<RoutineLog>();
                        }
                        routineLogs.add(routineLogService.findRoutineLog(log));
                        userLogMap.put(year+"-"+month,routineLogs);
                  }
            }
            return userLogMap;
      }

      // 5-1. 현재 헤더에 로그를 달 형식으로 표현 ( 잔디 형식 )
      @Transactional
      public HashMap<String,ArrayList<Integer>> findLogForGrassBase(HashMap<String,HashSet<RoutineLog>> userLogMap){
            HashMap<String,ArrayList<Integer>> userLogGrassForm = new HashMap<>();
            for(String userLogKey : userLogMap.keySet()){
                  String month = userLogKey.substring(5);
                  Integer[] monthInt = new Integer[calendar.get(month)];
                  Arrays.fill(monthInt, -1);
                  ArrayList<Integer> numList = new ArrayList<Integer>(Arrays.asList(monthInt));
                  int[] sumArray = new int[calendar.get(month)];
                  int[] numArray = new int[calendar.get(month)];
                  int routineDate = 0;
                  for(RoutineLog routineLog : userLogMap.get(userLogKey)){
                        String routineTime = routineLog.getTime();
                        routineDate = Integer.parseInt(routineTime.substring(0, 2))-1;
                        numArray[routineDate]++;
                        if (routineLog.getIsSuccess().equals("true")){
                              sumArray[routineDate]++;
                        }
                  }
                  int rate = 0;
                  for(int i=0;i<calendar.get(month);i++){
                        if(numArray[i]==0){
                              continue;
                        }
                        rate = 100 * sumArray[i] / numArray[i];
                        numList.set(i, rate);
                  }
                  userLogGrassForm.put(userLogKey,numList);
            }
            return userLogGrassForm;
      }

      // 6. 현재 헤더에 로그를 달 형식으로 표현 (해쉬태그 형식)
      @Transactional
      public HashMap<String,HashMap<String,HashMap<String,HashMap<String,Object>>>> findLogForHashtag(){
            HashMap<String,HashSet<RoutineLog>> userLogMap = findLogAllMonth();
            HashMap<String,HashMap<String,HashMap<String,HashMap<String,Object>>>> userLogHashtagForm = new HashMap<>();
            for(String userLogKey : userLogMap.keySet()){
                  String month = userLogKey.substring(5);
                  HashMap<String, HashMap<String,HashMap<String,Object>>> hashtagMap = new HashMap<String,HashMap<String,HashMap<String,Object>>>();
                  for(RoutineLog routineLog : userLogMap.get(userLogKey)){
                        String routineId = routineLog.getRoutineId();
                        Routine routine = routineService.findRoutineById(routineId);
                        String category = routine.getCategory();
                        HashMap<String,HashMap<String,Object>> hashtag = hashtagMap.get(category);
                        if(hashtag == null){
                              hashtag = new HashMap<String,HashMap<String,Object>>();
                        }
                        HashMap<String,Object> tagRoutine = hashtag.get(routineId);
                        if(tagRoutine == null){
                              tagRoutine = new HashMap<String,Object>();
                              tagRoutine.put("content", routine.getQuestName());
                              tagRoutine.put("cnt",0);
                              tagRoutine.put("success",0);
                        }
                        int cnt = (int)tagRoutine.get("cnt") + 1;
                        int success = (int)tagRoutine.get("success");
                        if(routineLog.getIsSuccess().equals("true")){
                              success++;
                        }
                        float rate = (float)success/(float)cnt;
                        tagRoutine.put("cnt", cnt);
                        tagRoutine.put("success", success);
                        tagRoutine.put("rate", rate);
                        hashtag.put(routineId,tagRoutine);
                        hashtagMap.put(category, hashtag);
                  }
                  userLogHashtagForm.put(userLogKey,hashtagMap);
            }
            return userLogHashtagForm;
      }

}
