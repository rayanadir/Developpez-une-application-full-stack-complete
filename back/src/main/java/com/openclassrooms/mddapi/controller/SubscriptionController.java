package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private TopicMapper topicMapper;

    /**
     * Click on subscribe/unsubscribe button
     * @param id
     * @return ResponseEntity
     */
    @PostMapping("/{id}")
    public ResponseEntity<?> clickButton(@PathVariable("id") String id){
        try{
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);
            Topic topic = this.topicService.findTopicById(Long.valueOf(id));
            Optional<Subscription> subscription = this.subscriptionService.findByUserAndTopic(user, topic);

            // If not subscribed
            if(subscription.isEmpty()){
                this.subscriptionService.subscribe(new Subscription(topic,user));
                MessageResponse res = new MessageResponse("Subscribed !");
                return ResponseEntity.ok().body(res);
            }
            // If already subscribed
            this.subscriptionService.unsubscribe(subscription.get().getId());
            MessageResponse res = new MessageResponse("Unsubscribed !");
            return ResponseEntity.ok().body(res);
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get user subscriptions
     * @return ResponseEntity
     */
    @GetMapping("")
    public ResponseEntity<?> findSubscriptionsByUser(){
        try{
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);
            Optional<List<Subscription>> subscriptions = this.subscriptionService.findByUser(user);

            // If no subscriptions
            if(subscriptions.isEmpty())
                return ResponseEntity.ok().build();

            // If subscriptions
            List<TopicDTO> list = new ArrayList<>();
            for(Subscription subscription: subscriptions.get()){
                list.add(this.topicMapper.toDto(subscription.getTopic()));
            }
            return ResponseEntity.ok().body(list);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
