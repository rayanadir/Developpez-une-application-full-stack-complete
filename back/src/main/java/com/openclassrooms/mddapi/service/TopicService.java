package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

/**
 * Class that handles topics features
 */
@Service
public class TopicService {

	@Autowired
	private TopicRepository topicRepository;

	/**
	 * Gets all topics
	 * @return List<Topic>
	 */
	public List<Topic> findAllTopics() {
		return this.topicRepository.findAll();
	}

	/**
	 * Gets a topic by its id
	 * @param id id of the topic
	 * @return Topic
	 */
	public Topic findTopicById(Long id){
		return this.topicRepository.findById(id).orElse(null);
	}

	
}
