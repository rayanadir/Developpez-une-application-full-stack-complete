package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring", uses = {PostService.class}, imports = {Arrays.class, Collectors.class, Post.class, User.class, Collections.class, Optional.class})
public abstract class PostMapper implements EntityMapper<PostDTO, Post> {

    @Autowired
    private TopicService topicService;

    @Autowired
    private UserService userService;

    @Mappings({
            @Mapping(source = "title", target = "title"),
            @Mapping(source = "content", target = "content"),
            @Mapping(source = "created_at", target = "created_at"),
            @Mapping(source = "updated_at", target = "updated_at"),
            @Mapping(target = "topic", expression = "java(this.topicService.findTopicById(postDto.getTopic_id()))"),
            @Mapping(target= "author", expression = "java(this.userService.findById(postDto.getAuthor_id()))"),
    })
    public abstract Post toEntity(PostDTO postDTO);

    @Mappings({
            @Mapping(source = "title", target="title"),
            @Mapping(source = "content", target= "content"),
            @Mapping(source = "created_at", target="created_at"),
            @Mapping(source = "post.topic.id", target = "topic_id"),
            @Mapping(source = "post.author.id", target = "author_id"),
    })
    public abstract PostDTO toDTO(Post post);
}
