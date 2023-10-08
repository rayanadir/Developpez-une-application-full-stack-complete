package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private PostMapper postMapper;

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id){
        try {
            Post post = this.postService.findPostById(Long.valueOf(id));
            if(post==null)
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok().body(this.postMapper.toDTO(post));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping()
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userService.findByEmail(email);
        postDTO.setAuthor_id(user.getId());
        Post post = this.postService.createPost(this.postMapper.toEntity(postDTO));
        return ResponseEntity.ok().body(this.postMapper.toDTO(post));
    }

}
