package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	public Post createPost(Post post){
		return this.postRepository.save(post);
	}

	public void deletePost(Long id){
		this.postRepository.deleteById(id);
	}

	public List<Post> findAllPosts(){
		return this.postRepository.findAll();
	}

	public Post findPostById(Long id){
		return this.postRepository.findById(id).orElse(null);
	}

	public Optional<List<Post>> findByTopic(Topic topic){
		return this.postRepository.findByTopic(topic);
	}
}
