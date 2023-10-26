package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Comment;

import java.util.List;
import java.util.Optional;

/**
 * CommentRepository interface
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<List<Comment>> findByPost(Post post);
}
