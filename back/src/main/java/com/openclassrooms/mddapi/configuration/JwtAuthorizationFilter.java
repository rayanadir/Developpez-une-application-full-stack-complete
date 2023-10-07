package com.openclassrooms.mddapi.configuration;

import com.openclassrooms.mddapi.service.TokenGeneratorService;
import com.openclassrooms.mddapi.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenGeneratorService tokenGeneratorService;

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(SecurityContextHolder.getContext().getAuthentication() == null){
            String authorization = request.getHeader("Authorization");
            if(authorization != null && authorization.startsWith("Bearer ")){
                String token = authorization.substring(7);
                Claims claims = tokenGeneratorService.getClaims(token);
                if(claims.getExpiration().after(new Date())){
                    String name = claims.getSubject();
                    UserDetails userDetails = userService.loadUserByUsername(name);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }
}
