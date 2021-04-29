package com.c105.roufarm.repository;

import com.c105.roufarm.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoDBRepository extends MongoRepository<User, String> {
}