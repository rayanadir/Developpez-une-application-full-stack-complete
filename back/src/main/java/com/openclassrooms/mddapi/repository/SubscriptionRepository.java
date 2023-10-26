package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * SubscriptionRepository interface
 */
@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<List<Subscription>> findByUser(User user);
    Optional<Subscription> findByUserAndTopic(User user, Topic topic);
}
