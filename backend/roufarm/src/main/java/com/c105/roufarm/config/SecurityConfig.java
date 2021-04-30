package com.c105.roufarm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

      @Autowired
      CustomAuthenticationEntryPoint authenticationEntryPoint;

      @Autowired
      JwtFilter jwtRequestFilter;

      

      @Override
      protected void configure(HttpSecurity http) throws Exception {
            http
                  .csrf().disable() // csrf 보안 토큰을 disable
                  .authorizeRequests().antMatchers("/주소", "/바꿀 주소들").permitAll() // 해당 url은 모든 유저에게 허용
                  .anyRequest().authenticated() // 그외 url은 모두 불 허용
                  .and()
                  .exceptionHandling() //예외가 발생하면 핸들링하겠다.
                  .authenticationEntryPoint(authenticationEntryPoint)
                  .and()
                  .sessionManagement() // 세션 조절 하는건데
                  .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 안 쓴다는 의미
                  .and()
                  .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
                  // Username이전에 jwtRequestFilter를 먼저 먹이겠다.
      }
}
