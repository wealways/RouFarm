package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.HashSet;
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
            String kakaoId = jwtTokenUtil.getId();
            routine.setKakaoId(kakaoId);
            routine.setIsActivate("true");
            routine.setRoutineLog(new HashSet<String>());
            String category = routine.getCategory();
            if(category == null || category.equals("")){
                  routine.setCategory("기타");
            }
            return routineMongoDBRepository.save(routine);
      }

      // 2. 본인 루틴 검색 (토큰으로)
      @Transactional
      public List<Routine> findRoutine(){
            String id = jwtTokenUtil.getId();
            User user = userMongoDBRepository.findById(id).get();
            List<Routine> routineList = new ArrayList<Routine>();
            for(String routineId:user.getRoutines()){
                  Routine routine = routineMongoDBRepository.findById(routineId).get();
                  if(routine.getIsActivate().equals("false")){
                        continue;
                  }
                  routineList.add(routine);
            }
            return routineList;
      }

      // 3. 본인 루틴 삭제
      @Transactional
      public Routine deleteRoutine(String routineId){
            Routine routine = routineMongoDBRepository.findById(routineId).get();
            routine.setIsActivate("false");
            routineMongoDBRepository.save(routine);
            return routine;
      }

      // 4. 루틴 아이디로 루틴 확인
      @Transactional
      public Routine findRoutineById(String routineId){
            return routineMongoDBRepository.findById(routineId).get();
      }

      // 5. 본인 루틴의 루틴 Id들을 조회
      @Transactional
      public List<String> getRoutineId(){
            List<Routine> routines = findRoutine();
            List<String> routineList = new ArrayList<String>();
            for(Routine routine : routines){
                  for(String routineLogId : routine.getRoutineLog()){
                        routineList.add(routineLogId);
                  }
            }
            return routineList;
      }
      
}
