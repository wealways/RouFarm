package com.c105.roufarm.service;

import com.c105.roufarm.model.RoutineLog;
import com.c105.roufarm.repository.RoutineLogMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoutineLogService {
      @Autowired
      RoutineLogMongoDBRepository routineLogMongoDBRepository;

      // 루틴 id로 루틴 로그 검색
      @Transactional
      public RoutineLog findRoutineLog(String id){
            return routineLogMongoDBRepository.findById(id).get();
      }
      
}
