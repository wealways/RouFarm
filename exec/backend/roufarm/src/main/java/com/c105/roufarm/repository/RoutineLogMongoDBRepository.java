package com.c105.roufarm.repository;

import com.c105.roufarm.model.RoutineLog;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutineLogMongoDBRepository extends MongoRepository<RoutineLog,String>{
}
