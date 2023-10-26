package com.openclassrooms.mddapi.security.jwt;

import com.openclassrooms.mddapi.service.UserService;
import io.jsonwebtoken.Claims;
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
import java.io.IOException;
import java.util.Date;

import static com.openclassrooms.mddapi.constants.Constants.HEADER_STRING;
import static com.openclassrooms.mddapi.constants.Constants.TOKEN_PREFIX;

/**
 * AuthTokenFilter class
 */
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    /**
     * Set authentication token by user context, does filter with http request & response
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(SecurityContextHolder.getContext().getAuthentication() == null){
            String authorization = request.getHeader(HEADER_STRING);
            if(authorization != null && authorization.startsWith(TOKEN_PREFIX)){
                String token = authorization.substring(7);
                Claims claims = this.jwtUtils.getClaims(token);
                if(claims.getExpiration().after((new Date()))){
                    String name = claims.getSubject();
                    UserDetails userDetails = this.userService.loadUserByUsername(name);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }


}
