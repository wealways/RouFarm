package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.List;

import com.c105.roufarm.model.Routine;
import com.c105.roufarm.model.RoutineLog;
import com.c105.roufarm.repository.RoutineLogMongoDBRepository;
import com.c105.roufarm.repository.RoutineMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoutineLogService {
      @Autowired
      RoutineLogMongoDBRepository routineLogMongoDBRepository;


      // 1. 루틴 id로 루틴 로그 검색
      @Transactional
      public RoutineLog findRoutineLog(String id){
            return routineLogMongoDBRepository.findById(id).get();
      }
      
      // 2. 루틴 리스트로 해당하는 루틴로그 리스트 가져오기
      // @Transactional
      // public List<RoutineLog> findRoutineLogMonth(List<Routine> routineList){
      //      List<RoutineLog> routineLogList = new ArrayList<RoutineLog>();
      //      for(Routine routine : routineList){
                  
      //      }
      // }

}
