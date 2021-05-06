package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.List;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.Routine;
import com.c105.roufarm.model.User;
import com.c105.roufarm.repository.RoutineMongoDBRepository;
import com.c105.roufarm.repository.UserMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoutineService {
      
      @Autowired
      RoutineMongoDBRepository routineMongoDBRepository;
      
      @Autowired
      UserMongoDBRepository userMongoDBRepository;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      // 1. 루틴 등록
      @Transactional
      public Routine saveRoutine(Routine routine){
            routineMongoDBRepository.save(routine);
            return routine;
      }

      // 2. 본인 루틴 검색 (토큰으로)
      @Transactional
      public List<Routine> findRoutine(){
            String id = jwtTokenUtil.getId();
            User user = userMongoDBRepository.findById(id).get();
            List<Routine> routineList = new ArrayList<Routine>();
            for(String routineId:user.getRoutines()){
                  Routine routine = routineMongoDBRepository.findById(routineId).get();
                  routineList.add(routine);
            }
            return routineList;
      }

      // 3. 월별 루틴 검색 (토큰으로)
      @Transactional
      public List<Routine> findRoutinebyMonth(String month) throws Exception{
            List<Routine> routineList = findRoutine();
            List<Routine> routineListMonth = new ArrayList<Routine>();
            for(Routine routine : routineList){
                  if(routine.getStartTime().substring(3, 5).equals(month)){ // "06-05-2021 14:17:15" // 에서 달만 자른다.
                        routineListMonth.add(routine);
                  }
            }
            return routineListMonth;
      }

      
}
