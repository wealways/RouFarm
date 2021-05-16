package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
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
      static HashMap<Integer,String> yoil = new HashMap<>();
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
            yoil.put(0, "Sun");
            yoil.put(1, "Mon");
            yoil.put(2, "Tue");
            yoil.put(3, "Wed");
            yoil.put(4, "Thu");
            yoil.put(5, "Fri");
            yoil.put(6, "Sat");
      };

      // 1. 헤더로 유저 로그 찾기
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

      //4-1. 받아온 날짜를 기준으로 로그정보를 뿌린다.
      @Transactional
      public HashSet<RoutineLog> findLogByDate(String getDate){
            HashMap<String,Object> days = findUserLogById().getDays();
            String getDateNum = getDate.substring(6);
            String getDateMonth = getDate.substring(4,6);
            String getDateYear = getDate.substring(0,4);
            String getDateKey = getDateNum+"-"+getDateMonth+"-"+getDateYear;
            HashSet<RoutineLog> userLogSet = new HashSet<>();
            Object logArray = days.get(getDateKey);
            System.out.println(getDateKey);
            if(logArray != null){
                  for(String log: (List<String>)logArray){
                        userLogSet.add(routineLogService.findRoutineLog(log));
                  }
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

      // 7. 전체 요일별 평균을 구함
      @Transactional
      public HashMap<String,HashMap<String, Object>> findLogForDay(){
            UserLog userLog = findUserLogById();
            HashMap<String,Object> days = userLog.getDays();

            HashMap<String,HashMap<String, Object>> dayMap = new HashMap<>();
            for(int i=0;i<7;i++){
                  HashMap<String,Object> countMap = new HashMap<>();
                  countMap.put("cnt", 0);
                  countMap.put("success",0);
                  countMap.put("rate", 0);
                  dayMap.put(yoil.get(i),countMap);
            }

            for(String daykey : days.keySet()){
                  int year = Integer.parseInt(daykey.substring(6)) - 1900;
                  int month = Integer.parseInt(daykey.substring(3,5))-1;
                  int date = Integer.parseInt(daykey.substring(0,2));
                  Date getDate = new Date(year, month, date);
                  int day = getDate.getDay();
                  String dayString = yoil.get(day);
                  HashMap<String, Object> countMap = dayMap.get(dayString);
                  for(String logId : (ArrayList<String>)days.get(daykey)){
                        RoutineLog routineLog = routineLogService.findRoutineLog(logId);
                        int cntNum = ((int)countMap.get("cnt")) + 1;
                        int successNum = ((int)countMap.get("success"));
                        if(routineLog.getIsSuccess().equals("true")){
                              successNum += 1;
                              
                        }
                        countMap.put("cnt", cntNum);
                        countMap.put("success",successNum);
                        countMap.put("rate", 100 * (float)successNum / (float)cntNum);
                  }
                  dayMap.put(dayString, countMap);
            }
            return dayMap;
      }

      // 8. 각 주차별 통계를 구함
      @Transactional
      public HashMap<String,HashMap<String, Object>> findLogForDayOfWeek(){
            UserLog userLog = findUserLogById();
            HashMap<String,Object> days = userLog.getDays();
            HashMap<String,HashMap<String,Object>> so = new HashMap<>();

            for(String daykey : days.keySet()){
                  int year = Integer.parseInt(daykey.substring(6));
                  int month = Integer.parseInt(daykey.substring(3,5))-1;
                  int date = Integer.parseInt(daykey.substring(0,2));
                  Calendar getDate = new GregorianCalendar(year, month, date);
                  int week = getDate.get(getDate.WEEK_OF_MONTH); // 주차를 구하고
                  int day = getDate.get(getDate.DAY_OF_WEEK)-1; // 요일을 구한다
                  String dayString = yoil.get(day); // 요일 문자를 구한다
                  String weekKey = daykey.substring(6)+"-"+daykey.substring(3,5)+"-w"+week;
                  HashMap<String,Object> soMap = so.get(weekKey);
                  if(soMap == null){
                        soMap = new HashMap<>();
                        for(int i=0;i<7;i++){
                              HashMap<String,Object> countMap = new HashMap<>();
                              countMap.put("cnt", 0);
                              countMap.put("success",0);
                              countMap.put("rate", 0);
                              soMap.put(yoil.get(i),countMap);
                        }
                  }
                  int cnt = 0;
                  int success = 0;
                  float rate = 0;
                  for(String logId : (ArrayList<String>)days.get(daykey)){
                        RoutineLog routineLog = routineLogService.findRoutineLog(logId);
                        cnt++;
                        if(routineLog.getIsSuccess().equals("true")){
                              success += 1;
                        }
                  }
                  rate = 100 * (float)success / (float)cnt;
                  HashMap<String,Object> countMap = (HashMap<String,Object>)soMap.get(dayString);
                  countMap.put("cnt", cnt);
                  countMap.put("success", success);
                  countMap.put("rate", rate);
                  soMap.put(dayString, countMap);
                  so.put(weekKey, soMap);
            }
            return so;
      }

      // 9. 각 주차별 실패리스트를 구함
      @Transactional
      public HashMap<String,ArrayList<HashMap<String,Object>>> findFailLogOfWeek(){
            HashMap<String,ArrayList<HashMap<String,Object>>> failLogMap = new HashMap<>();
            UserLog userLog = findUserLogById();
            HashMap<String,Object> days = userLog.getDays();
            for(String daykey : days.keySet()){
                  ArrayList<String> logIds = (ArrayList<String>)days.get(daykey);
                  int year = Integer.parseInt(daykey.substring(6));
                  int month = Integer.parseInt(daykey.substring(3,5))-1;
                  int date = Integer.parseInt(daykey.substring(0,2));
                  Calendar getDate = new GregorianCalendar(year, month, date);
                  int week = getDate.get(getDate.WEEK_OF_MONTH); // 주차를 구하고
                  String weekKey = daykey.substring(6)+"-"+daykey.substring(3,5)+"-w"+week;
                  ArrayList<HashMap<String,Object>> failLogWeek = failLogMap.get(weekKey);
                  if(failLogWeek == null){
                        failLogWeek = new ArrayList<>();
                  }
                  for(String logId : logIds){
                        RoutineLog routineLog = routineLogService.findRoutineLog(logId);
                        if(!routineLog.getIsSuccess().equals("true")){
                              Routine failRoutine = routineService.findRoutineById(routineLog.getRoutineId());
                              HashMap<String,Object> failRoutineLog = new HashMap<>();
                              failRoutineLog.put("id", routineLog.getId());
                              failRoutineLog.put("routine", failRoutine.getQuestName());
                              failRoutineLog.put("tag", failRoutine.getCategory());
                              failLogWeek.add(failRoutineLog);
                        }
                  }
                  failLogMap.put(weekKey,failLogWeek);
            }
            
            return failLogMap;
      }

      // 번외. 숫자로 요일 구하기
      public String convertYoil(int num){
            return yoil.get(num);
      }

}
