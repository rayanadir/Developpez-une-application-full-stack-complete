package com.openclassrooms.mddapi.payload.request;

import org.hibernate.validator.constraints.Length;
import org.springframework.lang.NonNull;

import javax.validation.constraints.*;
import lombok.Data;

/**
 * SignupRequest class
 */
@Data
public class SignupRequest {

    @NonNull
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NonNull
    @Length(min=3)
    private String name;

    @NonNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+!*?=-])(?=\\S+$).{8,}$")
    @Length(min = 8, max = 40)
    private String password;

}
