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
}
