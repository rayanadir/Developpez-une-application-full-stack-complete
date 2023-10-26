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
    private Long postId;

    @NonNull
    private Long userId;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime created_at;

    @NonNull
    private LocalDateTime updated_at;

    @NonNull
    public Long getPostId() {
        return postId;
    }

    public void setPostId(@NonNull Long postId) {
        this.postId = postId;
    }

    @NonNull
    public Long getUserId(){
        return userId;
    }

    public void setUserId(Long userId){
        this.userId = userId;
    }

    @NonNull
    public String getContent() {
        return content;
    }

    public void setContent(@NonNull String content) {
        this.content = content;
    }

    @NonNull
    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(@NonNull LocalDateTime created_at) {
        this.created_at = created_at;
    }

    @NonNull
    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(@NonNull LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}
