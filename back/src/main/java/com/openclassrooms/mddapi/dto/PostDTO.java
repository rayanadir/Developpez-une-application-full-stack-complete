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
    private Long user_id;

    @NonNull
    private String title;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime created_at;

    @NonNull
    private LocalDateTime updated_at;
}
