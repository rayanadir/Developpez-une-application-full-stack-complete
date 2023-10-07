package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NonNull
    private Long id;

    @NonNull
    private String username;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime created_at;

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
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
}
