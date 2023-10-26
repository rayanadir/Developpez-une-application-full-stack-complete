package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * UserMapper class
 */
@Component
@Mapper(componentModel = "spring")
public abstract class UserMapper implements EntityMapper<UserDTO, User> {
}
