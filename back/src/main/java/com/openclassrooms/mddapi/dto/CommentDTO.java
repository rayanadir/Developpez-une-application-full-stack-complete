package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

/**
 * CommentDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NonNull
    private Long id;

    @NonNull
    private Long postId;

    @NonNull
    private User user;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private LocalDateTime updatedAt;

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public Long getPostId() {
        return postId;
    }

    public void setPostId(@NonNull Long postId) {
        this.postId = postId;
    }

    @NonNull
    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    @NonNull
    public String getContent() {
        return content;
    }

    public void setContent(@NonNull String content) {
        this.content = content;
    }

    @NonNull
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(@NonNull LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @NonNull
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(@NonNull LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
