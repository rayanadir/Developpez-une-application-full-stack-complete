package com.openclassrooms.mddapi.model;

import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * Comment entity
 */
@Data
@Entity
@Table(name = "comments")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@NonNull
	@JoinColumn(name="post_id")
	private Post post;

	@ManyToOne
	@NonNull
	@JoinColumn(name= "user_id")
	private User user;

	@NonNull
	@Size(max = 2000)
	@Column(name = "content")
	private String content;

	@CreatedDate
	@Column(name= "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name= "updated_at")
	private LocalDateTime updatedAt;

	public Comment(){ }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}
