package com.c105.roufarm.repository;

import com.c105.roufarm.model.UserLog;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLogMongoDBRepository extends MongoRepository<UserLog,String>{
      
}
