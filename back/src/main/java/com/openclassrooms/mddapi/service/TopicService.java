package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
public class TopicService {

	private TopicRepository topicRepository;
	
	public TopicService(TopicRepository topicRepository) {
		this.topicRepository = topicRepository;
	}


	public List<Topic> findAllTopics() {
		return this.topicRepository.findAll();
	}

	public Topic findTopicById(Long id){
		return this.topicRepository.findById(id).orElse(null);
	}
	
}
