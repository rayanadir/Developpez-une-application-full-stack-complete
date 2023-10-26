package com.openclassrooms.mddapi.payload.response;

import lombok.Getter;
import lombok.Setter;

/**
 * JwtResponse class response
 */
@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    private String email;

    public JwtResponse(String token, Long id, String name, String email){
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

}
