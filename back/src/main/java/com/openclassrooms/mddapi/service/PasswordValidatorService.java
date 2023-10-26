package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.openclassrooms.mddapi.constants.Constants.PASSWORD_PATTERN;

@Service
public class PasswordValidatorService {
    /**
     * Checks if password matches validator pattern
     * @param password
     * @return boolean (true | false)
     */
    public boolean isValidPassword(String password){
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&=+-^#]).{8,}$";
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        if(password==null)
            return false;
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
