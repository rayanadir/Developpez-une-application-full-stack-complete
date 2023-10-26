package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * TopicMapper class
 */
@Component
@Mapper(componentModel = "spring")
public abstract class TopicMapper implements EntityMapper<TopicDTO, Topic> {
}
