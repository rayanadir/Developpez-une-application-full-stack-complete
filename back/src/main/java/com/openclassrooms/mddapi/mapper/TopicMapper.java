package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class TopicMapper implements EntityMapper<TopicDTO, Topic> {
}
