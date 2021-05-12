package com.c105.roufarm.service;

import java.util.HashMap;
import java.util.HashSet;

import com.c105.roufarm.config.JwtTokenUtil;
import com.c105.roufarm.model.Profile;
import com.c105.roufarm.model.Routine;
import com.c105.roufarm.model.User;
import com.c105.roufarm.repository.UserMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

      @Autowired
      UserMongoDBRepository userMongoDBRepository;

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      // 1. 유저 등록
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

      // 2. Id로 유저 찾기
      @Transactional
      public User findUser(String id) throws Exception {
            return userMongoDBRepository.findById(id).get();
      }

      // 3. User 모드 수정
      @Transactional
      public User editUser(HashMap<String, Object> changeMassage) {
            User user = userMongoDBRepository.findById(jwtTokenUtil.getId()).get();
            Profile profile = user.getProfile();
            profile.setNickname((String) changeMassage.get("nickname"));
            profile.setMode((String) changeMassage.get("mode"));
            user.setProfile(profile);
            return userMongoDBRepository.save(user);
      }

      // 4. User 루틴 추가
      @Transactional
      public User saveUserRoutine(Routine routine){
            User user = userMongoDBRepository.findById(jwtTokenUtil.getId()).get();
            HashSet<String> routines = user.getRoutines();
            routines.add(routine.getUuid());
            user.setRoutines(routines);
            return userMongoDBRepository.save(user);
      }
}
