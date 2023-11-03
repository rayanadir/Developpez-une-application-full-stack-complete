package com.openclassrooms.mddapi.constants;

public class Constants {
    public static final String SECRET = "SECRET_KEY";
    public static final int EXPIRATION_TIME = 1000*60*60;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+!*?=-])(?=\\S+$).{8,}$";
}
