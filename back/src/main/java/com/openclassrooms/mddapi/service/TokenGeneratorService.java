package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.*;

import java.util.Date;

@Service
public class TokenGeneratorService {

    @Value("${JWT_SECRET_KEY}")
    private String tokenSecret;

    @Value("${JWT_EXPIRATION}")
    private int tokenExpiration;

    public String generateToken(Authentication authentication){
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))
                .signWith(SignatureAlgorithm.HS256, tokenSecret).compact();
    }

    public Claims getClaims(String token){
        return Jwts.parser().setSigningKey(tokenSecret).parseClaimsJws(token).getBody();
    }
}
