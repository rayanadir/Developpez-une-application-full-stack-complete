package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Class that handles user features
 */
@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;


    /**
     * Finds a user by its email
     * @param email user email
     * @return User
     */
    public User findByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    /**
     * Creates a user
     * @param user
     * @return User
     */
    public User createUser(User user){
        return this.userRepository.save(user);
    }

    /**
     * Checks if email already exists
     * @param email
     * @return boolean
     */
    public Boolean existsByEmail(String email){
        return this.userRepository.existsByEmail(email);
    }

    /**
     * Updates the user
     * @param id of the user to update
     * @param user
     * @return User
     */
    public User update(Long id, User user){
        user.setId(id);
        return this.userRepository.save(user);
    }

    /**
     * Get user by email
     * @param username email of the user
     * @return UserDetails
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(username);
        if(user==null)
            throw new UsernameNotFoundException("User doesn't exist by this name");
        return user;
    }
}
