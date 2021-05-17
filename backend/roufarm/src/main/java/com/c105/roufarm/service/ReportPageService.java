package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;

import com.c105.roufarm.model.Routine;
import com.c105.roufarm.model.RoutineLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportPageService {
      
      @Autowired
      UserLogService userLogService;

      @Autowired
      RoutineService routineService;

      // 1. 리포트 페이지에 보여줄 잔디와 해쉬태그별 통계 (달별 통계)
      @Transactional
      public ArrayList<HashMap<String,Object>> findReportMonth(){
            HashMap<String,ArrayList<Integer>> logsForGrass = userLogService.findLogForGrass();
            HashMap<String,HashMap<String,HashMap<String,HashMap<String,Object>>>> logsForHashtag = userLogService.findLogForHashtag();
            HashMap<String,Object> reportForGrassAndHashtag = new HashMap<String,Object>();
            for(String logsKey : logsForGrass.keySet()){
                  ArrayList<Integer> daylist = logsForGrass.get(logsKey);
                  HashMap<String,Object> contents = new HashMap<String,Object>();
                  contents.put("월간수확", daylist);

                  HashMap<String,Object> hashtagBuilder = new HashMap<>();
                  HashMap<String,HashMap<String,HashMap<String,Object>>> hashtags = logsForHashtag.get(logsKey);
                  for(String hashtag : hashtags.keySet()){
                        ArrayList<HashMap<String,Object>> hashtaglist = new ArrayList<>();
                        HashMap<String,HashMap<String,Object>> hashtagValues = hashtags.get(hashtag);
                        for(String hashtagId : hashtagValues.keySet()){
                              HashMap<String,Object> hashtagContent = new HashMap<>();
                              HashMap<String,Object> hashtagValue = hashtagValues.get(hashtagId);
                              hashtagContent.put("id", hashtagId);
                              hashtagContent.put("content", hashtagValue.get("content"));
                              hashtagContent.put("cnt", hashtagValue.get("cnt"));
                              hashtagContent.put("rate", hashtagValue.get("rate"));
                              hashtaglist.add(hashtagContent);
                        }
                        hashtagBuilder.put(hashtag, hashtaglist);
                  }
                  contents.put("해쉬태그별", hashtagBuilder);

                  reportForGrassAndHashtag.put(logsKey, contents);
            }
            ArrayList<HashMap<String,Object>> reportMonth = new ArrayList<>();
            for(String Date : reportForGrassAndHashtag.keySet()){
                  HashMap<String,Object> reportOne = new HashMap<>();
                  reportOne.put(Date, reportForGrassAndHashtag.get(Date));
                  reportMonth.add(reportOne);
            }
            reportMonth.sort(new Comparator<HashMap<String,Object>>(){

                  @Override
                  public int compare(HashMap<String,Object> o1, HashMap<String,Object> o2) {
                        for(String o1Report : o1.keySet()){
                              for(String o2Report: o2.keySet()){
                                    int year1 = Integer.parseInt(o1Report.substring(0,4));
                                    int year2 = Integer.parseInt(o2Report.substring(0, 4));
                                    if(year1 < year2){
                                          return 1;
                                    }
                                    else if(year1 > year2){
                                          return -1;
                                    }
                                    int month1 = Integer.parseInt(o1Report.substring(5));
                                    int month2 = Integer.parseInt(o2Report.substring(5));
                                    if(month1 < month2){
                                          return 1;
                                    }
                                    else if(month1 > month2){
                                          return -1;
                                    }
                              }
                        }
                        return 0;
                  }
            });
            return reportMonth;
      }

      // 2. 리포트 페이지에 보여줄 날짜별 통계
      @Transactional
      public HashSet<HashMap<String,Object>> findReportDaily(String getDate){
            HashSet<HashMap<String,Object>> dailyReport = new HashSet<>();
            HashSet<RoutineLog> dailySet = userLogService.findLogByDate(getDate);
            for(RoutineLog routineLog : dailySet){
                  HashMap<String,Object> dailyLog = new HashMap<>();
                  Routine routine = routineService.findRoutineById(routineLog.getRoutineId());
                  dailyLog.put("id", routineLog.getRoutineId());
                  dailyLog.put("routine", routine.getQuestName());
                  dailyLog.put("tag", routine.getCategory());
                  dailyLog.put("completed", routineLog.getIsSuccess().equals("true") ? true : false);
                  dailyReport.add(dailyLog);
            }
            return dailyReport;
      }

      // 3. 리포트 페이지에 보여줄 주간별 통계
      @Transactional
      public ArrayList<HashMap<String,Object>> findReportWeek(){
            HashMap<String,HashMap<String,Object>> LogForDay = userLogService.findLogForDay(); // 전체 요일 평균
            HashMap<String,HashMap<String,Object>> LogForDayOfWeek = userLogService.findLogForDayOfWeek(); // 해당 요일 평균
            HashMap<String,ArrayList<HashMap<String,Object>>> LogForFail = userLogService.findFailLogOfWeek(); // 실패리스트
            HashMap<String,HashMap<String,Object>> weekReport = new HashMap<>();
            for(String week : LogForDayOfWeek.keySet()){
                  HashMap<String,Object> failList = LogForDayOfWeek.get(week);
                  HashMap<String,Object> weekList = weekReport.get(week);
                  if(weekList == null){
                        weekList = new HashMap<>();
                  }
                  ArrayList<HashMap<String,Object>> failLogList = new ArrayList<>();
                  for(HashMap<String,Object> getFailLogMap : LogForFail.get(week)){
                        HashMap<String,Object> failLogMap = new HashMap<>();
                        failLogMap.put("id", getFailLogMap.get("id"));
                        failLogMap.put("routine", getFailLogMap.get("routine"));
                        failLogMap.put("tag", getFailLogMap.get("tag"));
                        failLogList.add(failLogMap);
                  }
                  weekList.put("실패리스트",failLogList);
                  HashMap<String,Object> dayMap = new HashMap<>();
                  ArrayList<Object> dayList = new ArrayList<>();
                  ArrayList<Object> totalDayList = new ArrayList<>();
                  for(int i=1;i<8;i++){
                        int j = i % 7;
                        String yoil = userLogService.convertYoil(j);
                        HashMap<String,Object> oneDay = new HashMap<>();
                        oneDay.put("x", yoil);
                        oneDay.put("y", ((HashMap<String,Object>)failList.get(yoil)).get("rate"));
                        dayList.add(oneDay);
                        HashMap<String,Object> totalOneDay = new HashMap<>();
                        totalOneDay.put("x",yoil);
                        totalOneDay.put("y", ((HashMap<String,Object>)LogForDay.get(yoil)).get("rate"));
                        totalDayList.add(totalOneDay);
                  }
                  dayMap.put("전체평균",totalDayList);
                  dayMap.put("평균",dayList);
                  weekList.put("요일별평균",dayMap);
                  weekReport.put(week, weekList);
            }
            ArrayList<HashMap<String,Object>> weekReportList = new ArrayList<>();
            for(String weekReportKey : weekReport.keySet()){
                  HashMap<String,Object> oneReport = new HashMap<>();
                  oneReport.put(weekReportKey, weekReport.get(weekReportKey));
                  weekReportList.add(oneReport);
            }
            weekReportList.sort(new Comparator<HashMap<String,Object>>(){

                  @Override
                  public int compare(HashMap<String,Object> o1, HashMap<String,Object> o2) {
                        for(String o1Report : o1.keySet()){
                              for(String o2Report: o2.keySet()){
                                    int year1 = Integer.parseInt(o1Report.substring(0,4));
                                    int year2 = Integer.parseInt(o2Report.substring(0, 4));
                                    if(year1 < year2){
                                          return 1;
                                    }
                                    else if(year1 > year2){
                                          return -1;
                                    }
                                    int month1 = Integer.parseInt(o1Report.substring(5, 7));
                                    int month2 = Integer.parseInt(o2Report.substring(5, 7));
                                    if(month1 < month2){
                                          return 1;
                                    }
                                    else if(month1 > month2){
                                          return -1;
                                    }
                                    int date1 = Integer.parseInt(o1Report.substring(9));
                                    int date2 = Integer.parseInt(o2Report.substring(9));
                                    if (date1 < date2){
                                          return 1;
                                    }
                                    else if(date1 > date2){
                                          return -1;
                                    }
                              }
                        }
                        return 0;
                  }
            });
            return weekReportList;
            
      }
      @Transactional
      public ArrayList<String> findLogWeek(){
            return userLogService.findLogWeek();
      }
      
}
