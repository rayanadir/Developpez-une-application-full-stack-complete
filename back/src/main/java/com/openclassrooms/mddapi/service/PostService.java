package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Class that handles Post features
 */
@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	/**
	 * Creates a post
	 * @param post entity
	 * @return Post
	 */
	public Post createPost(Post post){
		return this.postRepository.save(post);
	}

	/**
	 * Deletes a post
	 * @param id id of the post to delete
	 */
	public void deletePost(Long id){
		this.postRepository.deleteById(id);
	}

	/**
	 * Gets all posts
	 * @return List<Post>
	 */
	public List<Post> findAllPosts(){
		return this.postRepository.findAll();
	}

	/**
	 * Finds a post by its id
	 * @param id id of the post
	 * @return Post
	 */
	public Post findPostById(Long id){
		return this.postRepository.findById(id).orElse(null);
	}

}
