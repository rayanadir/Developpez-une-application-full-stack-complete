package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    @NonNull
    private Long id;

    @NonNull
    private Long topic_id;

    @NonNull
    private Long author_id;

    @NonNull
    private String title;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime created_at;

    @NonNull
    private LocalDateTime updated_at;

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public Long getTopic_id() {
        return topic_id;
    }

    public void setTopic_id(@NonNull Long topic_id) {
        this.topic_id = topic_id;
    }

    @NonNull
    public Long getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(@NonNull Long author_id) {
        this.author_id = author_id;
    }

    @NonNull
    public String getTitle() {
        return title;
    }

    public void setTitle(@NonNull String title) {
        this.title = title;
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
