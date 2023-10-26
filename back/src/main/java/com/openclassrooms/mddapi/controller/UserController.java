package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Class that handles "User" controller
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    /**
     * Gets user information
     * @return ResponseEntity (OK or badRequest)
     */
    @GetMapping()
    public ResponseEntity<?> me(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            if(email == null)
                return ResponseEntity.notFound().build();
            User user = this.userService.findByEmail(email);
            return ResponseEntity.ok().body(this.userMapper.toDto(user));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Updates a user information
     * @param id id of the user to update
     * @param userDTO Object that contains user request
     * @return ResponseEntity (OK or badRequest)
     */
    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody UserDTO userDTO){
        try{
            User user = this.userService.update(Long.parseLong(id), this.userMapper.toEntity(userDTO));
            return ResponseEntity.ok().body(this.userMapper.toDto(user));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

}
