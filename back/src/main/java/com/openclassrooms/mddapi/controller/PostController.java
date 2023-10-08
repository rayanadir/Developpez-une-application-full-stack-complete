package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/feed")
    public ResponseEntity<?> findUserSubscriptions(){
        try{
            // Get user info
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);

            // Get all user subscriptions
            Optional<List<Subscription>> subscriptions = this.subscriptionService.findByUser(user);

            if(subscriptions.isEmpty())
                return ResponseEntity.ok().build();

            List<PostDTO> list = new ArrayList<>();

            // Get user feed
            for(Subscription subscription: subscriptions.get()){
                Optional<List<Post>> posts = this.postService.findByTopic(subscription.getTopic());
                if(posts.isPresent()){
                    for (Post post : posts.get()){
                        list.add(this.postMapper.toDTO(post));
                    }
                }
            }
            return ResponseEntity.ok().body(list);
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
