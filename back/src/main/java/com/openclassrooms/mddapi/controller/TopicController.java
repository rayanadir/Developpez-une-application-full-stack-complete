package com.openclassrooms.mddapi.controller;

import java.util.ArrayList;
import java.util.List;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.service.TopicService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;

/**
 * Class that handles "Topic" controller
 */
@RestController
@RequestMapping("/api/topic")
public class TopicController {

	@Autowired
	private TopicService topicService;

	/**
	 * Get all topics
	 * @return ResponseEntity (OK or badRequest)
	 */
	@GetMapping()
	public ResponseEntity<?> findAll() {
		try{
			List<Topic> topics = this.topicService.findAllTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			List<TopicDTO> list = new ArrayList<>();
			ModelMapper modelMapper = new ModelMapper();
			for(Topic topic: topics){
				list.add(modelMapper.map(topic, TopicDTO.class));
			}
			return ResponseEntity.ok().body(list);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Get a topic by its id
	 * @param id id of the topic
	 * @return ResponseEntity (OK or badRequest)
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") String id){
		try{
			Topic topic = this.topicService.findTopicById(Long.valueOf(id));
			if(topic==null)
				return ResponseEntity.notFound().build();
			ModelMapper modelMapper = new ModelMapper();
			return ResponseEntity.ok().body(modelMapper.map(topic, TopicDTO.class));
		}catch (NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}

}
