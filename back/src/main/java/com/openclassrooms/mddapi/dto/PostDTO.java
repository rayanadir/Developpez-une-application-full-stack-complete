package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

/**
 * PostDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    @NonNull
    private Long id;

    @NonNull
    private Long topic_id;

    @NonNull
    private Topic topic;

    @NonNull
    private User author;

    @NonNull
    private String title;

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
    public Long getTopic_id() {
        return topic_id;
    }

    public void setTopic_id(@NonNull Long topic_id) {
        this.topic_id = topic_id;
    }

    @NonNull
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(@NonNull Topic topic) {
        this.topic = topic;
    }

    @NonNull
    public User getAuthor() {
        return author;
    }

    public void setAuthor(@NonNull User author) {
        this.author = author;
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
