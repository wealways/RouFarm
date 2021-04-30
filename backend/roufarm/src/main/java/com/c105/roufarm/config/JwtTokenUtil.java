package com.c105.roufarm.config;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtTokenUtil {
      
      private static final String secret = "jwtpassword";

      public Claims getClaim(String token){
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
      }

      public String getUsernameFromToken(String token){
            Claims claims = getClaim(token);
            return claims.getId();
      }

      public boolean validateToken(String token, UserDetails userDetails){
            String username = getUsernameFromToken(token);
            Date experation = getClaim(token).getExpiration();
            boolean isExpired = experation.before(new Date()); // 만료기간이 현재보다 이전이면 true
            boolean equalUsername = username.equals(userDetails.getUsername());
            return equalUsername && !isExpired; // 만료기간이 지났으므로 유효하지 않음
      }
}
