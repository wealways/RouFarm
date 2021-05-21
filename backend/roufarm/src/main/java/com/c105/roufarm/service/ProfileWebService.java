package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.HashMap;

import com.c105.roufarm.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileWebService {

      @Autowired
      UserLogService userLogService;

      @Autowired
      UserService userService;

      // 1. 프로필 조회 페이지에 필요한 정보들
      @Transactional
      public HashMap<String,Object> findProfileMap(String id) throws Exception{
            HashMap<String,Object> profileMap = new HashMap<String,Object>();
            User user = userService.findUser(id);
            profileMap.put("profile",user.getProfile());
            HashMap<String,ArrayList<Integer>> userLogForGrass = userLogService.findLogForGrass(id);
            profileMap.put("Month", userLogForGrass);
            return profileMap;
      }
}
