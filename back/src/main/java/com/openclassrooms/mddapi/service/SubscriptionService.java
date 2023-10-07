package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    private Subscription create(Subscription subscription){
        return this.subscriptionRepository.save(subscription);
    }

    public void delete(Long id){
        this.subscriptionRepository.deleteById(id);
    }

    public List<Subscription> findAllSubscription(){
        return this.subscriptionRepository.findAll();
    }

    public Subscription findById(Long id){
        return this.subscriptionRepository.findById(id).orElse(null);
    }

    public Optional<List<Subscription>> findByUser(User user){
        return this.subscriptionRepository.findByUser(user);
    }

    public Subscription update(Long id, Subscription subscription){
        subscription.setId(id);
        return this.subscriptionRepository.save(subscription);
    }
}
