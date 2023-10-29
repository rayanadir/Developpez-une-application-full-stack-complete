package com.openclassrooms.mddapi.model;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 * Topic entity
 */
@Data
@Entity
@Table(name = "topics")
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NonNull
	@Size(max = 50)
	@Column(name="name",nullable = false)
	private String name;

	@NonNull
	@Size(max = 2000)
	@Column(name="description")
	private String description;

	public Topic(Long id, String name, String description){
		this.id=id;
		this.name=name;
		this.description=description;
	}

	public Topic(){ }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() { return description; }

	public void setDescription(String description) { this.description = description; }
	
}
