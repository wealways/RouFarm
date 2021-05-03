package com.c105.roufarm.service;

import java.util.HashMap;
import java.util.HashSet;

import com.c105.roufarm.model.Profile;
import com.c105.roufarm.model.User;
import com.c105.roufarm.repository.UserMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

      @Autowired
      UserMongoDBRepository userMongoDBRepository;

      @Transactional
      public User saveUser(HashMap<String, Object> kakaoMassage) {
            String id = (String) kakaoMassage.get("id");
            String nickname = (String) kakaoMassage.get("nickname");
            User user = new User();
            user.setId(id);
            user.setProfile(new Profile(nickname));
            user.setRoutines(new HashSet<String>());
            return userMongoDBRepository.save(user);
      }

      @Transactional
      public User findUser(String id) throws Exception {
            return userMongoDBRepository.findById(id).get();
      }

      @Transactional
      public User editUser(String id, HashMap<String, Object> changeMassage) {
            User user = userMongoDBRepository.findById(id).get();
            Profile profile = user.getProfile();
            profile.setNickname((String) changeMassage.get("nickname"));
            profile.setMode((String) changeMassage.get("mode"));
            user.setProfile(profile);
            return userMongoDBRepository.save(user);
      }
}
