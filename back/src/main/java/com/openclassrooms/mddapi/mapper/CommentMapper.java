package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.UserService;
import org.hibernate.engine.internal.Collections;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * CommentMapper class
 */
@Component
@Mapper(componentModel = "spring", uses={CommentService.class}, imports = {Arrays.class, Collections.class, Post.class})
public abstract class CommentMapper implements EntityMapper<CommentDTO, Comment> {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    /**
     * Convert "Comment" entity to CommentDTO
     * @param comment entity
     * @return CommentDTO
     */
    @Mappings({
            @Mapping(source = "content", target = "content"),
            @Mapping(source = "created_at", target = "created_at"),
            @Mapping(source = "user.username", target = "username"),
            @Mapping(source = "post.id", target = "id"),
    })
    public abstract CommentDTO toDTO(Comment comment);
}
