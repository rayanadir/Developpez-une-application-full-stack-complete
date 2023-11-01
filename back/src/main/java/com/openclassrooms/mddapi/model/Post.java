package com.openclassrooms.mddapi.model;

import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * Post entity
 */
@Data
@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NonNull
	@ManyToOne
	@JoinColumn(name = "topic")
	private Topic topic;

	@NonNull
	@JoinColumn(name = "topic_id")
	private Long topic_id;

	@NonNull
	@ManyToOne
	@JoinColumn(name="user_id")
	private User author;

	@NonNull
	@Size(max = 50)
	@Column(name="title")
	private String title;

	@NonNull
	@Size(max = 2000)
	@Column(name="content")
	private String content;

	@CreatedDate
	@Column(name= "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name= "updated_at")
	private LocalDateTime updatedAt;

	public Post(){ }

}
