package com.c105.roufarm.config;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {

      private static final String secret = "jwtpassword";

      public static final long JWT_TOKEN_VALIDITY = 30 * 24 * 60 * 60;

      public Claims getClaim(String token) {
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
      }

      public String getUsernameFromToken(String token) {
            Claims claims = getClaim(token);
            return claims.getId();
      }

      public boolean validateToken(String token, UserDetails userDetails) {
            String username = getUsernameFromToken(token);
            Date experation = getClaim(token).getExpiration();
            boolean isExpired = experation.before(new Date()); // 만료기간이 현재보다 이전이면 true
            boolean equalUsername = username.equals(userDetails.getUsername());
            return equalUsername && !isExpired; // 만료기간이 지났으므로 유효하지 않음
      }

      public String generateToken(String id) {
            return Jwts.builder()
                .setId(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
      }

      public String getId(){
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                              .currentRequestAttributes()).getRequest();
            String token = request.getHeader("Authorization");
            String id = getUsernameFromToken(token);
            return id;
      }
}
