package com.openclassrooms.mddapi.controller;

import java.util.List;

import com.openclassrooms.mddapi.service.TopicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.model.Topic;

@RestController
@RequestMapping("/topic")
public class TopicController {
	
	private TopicService topicService;
	
	public TopicController(TopicService topicService) {
		this.topicService = topicService;		
	}

	@GetMapping
	public List<Topic> getTopics() {
		return topicService.findAllTopics();
	}
	
	
}
