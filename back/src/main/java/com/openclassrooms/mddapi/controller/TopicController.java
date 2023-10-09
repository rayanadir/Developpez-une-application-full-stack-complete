package com.openclassrooms.mddapi.controller;

import java.util.ArrayList;
import java.util.List;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

	@Autowired
	private TopicService topicService;

	@Autowired
	private TopicMapper topicMapper;

	public TopicController(TopicService topicService) {
		this.topicService = topicService;		
	}

	@GetMapping()
	public ResponseEntity<?> findAll() {
		try{
			List<Topic> topics = topicService.findAllTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			List<TopicDTO> list = new ArrayList<>();
			for(Topic topic: topics){
				list.add(this.topicMapper.toDto(topic));
			}
			return ResponseEntity.ok().body(list);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") String id){
		try{
			Topic topic = this.topicService.findTopicById(Long.valueOf(id));
			if(topic==null)
				return ResponseEntity.notFound().build();
			return ResponseEntity.ok().body(this.topicMapper.toDto(topic));
		}catch (NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping()
	public ResponseEntity<?> create(@RequestBody TopicDTO topicDTO){
		Topic topic = this.topicService.createTopic(this.topicMapper.toEntity(topicDTO));
		return ResponseEntity.ok().body(this.topicMapper.toDto(topic));
	}
	
}
