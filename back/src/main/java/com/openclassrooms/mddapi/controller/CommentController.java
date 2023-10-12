package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    private CommentMapper commentMapper;

    @PostMapping()
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userService.findByEmail(email);
        Post post = this.postService.findPostById(commentDTO.getPostId());

        if(post==null)
            return ResponseEntity.badRequest().build();

        commentDTO.setUserId(user.getId());
        commentDTO.setCreated_at(LocalDateTime.now());
        commentDTO.setUpdated_at(LocalDateTime.now());
        Comment comment = this.commentService.create(this.commentMapper.toEntity(commentDTO));

        return ResponseEntity.ok().body(this.commentMapper.toDTO(comment));
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<?> getAllCommentsByPostId(@PathVariable("postId") String postId){
        try{
            Post post = this.postService.findPostById(Long.valueOf(postId));
            Optional<List<Comment>> comments = this.commentService.findAllCommentsByPost(post);

            if(comments.isEmpty())
                return ResponseEntity.ok().body(new ArrayList());

            List<CommentDTO> commentsList = new ArrayList<>();
            for(Comment comment : comments.get()){
                commentsList.add(this.commentMapper.toDTO(comment));
            }
            return ResponseEntity.ok().body(commentsList);
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

}
