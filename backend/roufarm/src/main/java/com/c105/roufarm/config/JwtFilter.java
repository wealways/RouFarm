package com.c105.roufarm.config;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.c105.roufarm.service.CustomUserDetailsService;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

      @Autowired
      JwtTokenUtil jwtTokenUtil;

      @Autowired
      CustomUserDetailsService jwtUserDetailService;

      private static final List<String> EXCLUDE_URL = Collections.unmodifiableList(Arrays.asList("/user","/profileWeb/**","/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**"));

      @Override
      protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                  throws ServletException, IOException {
            final String requestTokenHeader = request.getHeader("Authorization");

            String username = null;
            String jwtToken = null;

            if (requestTokenHeader != null) {
                  jwtToken = requestTokenHeader;
                  try {
                        username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                  } catch (IllegalArgumentException e) {
                        System.out.println("JWT Token을 얻을 수 없었다.");
                  } catch (ExpiredJwtException e) {
                        System.out.println("JWT Token이 만료되었다.");
                  }
            } else {
                  logger.warn("없다. JWTtoken");
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                  UserDetails userDetails = this.jwtUserDetailService.loadUserByUsername(username);

                  if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                  }
            }
            filterChain.doFilter(request, response);
      }

      @Override
      protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
            return EXCLUDE_URL.stream().anyMatch(exclude -> exclude.equalsIgnoreCase(request.getServletPath()));
      }

}
