package com.c105.roufarm.service;

import java.util.HashSet;
import java.util.Set;

import com.c105.roufarm.model.User;
import com.c105.roufarm.repository.UserMongoDBRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{

      @Autowired
      private UserMongoDBRepository userMongoDBRepository;

      @Override
      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userMongoDBRepository.findById(username).get();
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER")); // 모든 사람이 평등하다. User권한을 나누어 같도록.
            return new org.springframework.security.core.userdetails.User(user.getId(),"",grantedAuthorities);
      }
      
}
