package com.openclassrooms.mddapi.payload.response;

import com.openclassrooms.mddapi.model.Topic;

public class SubscriptionResponse {

    private String message;
    private Topic topic;

    public SubscriptionResponse(String message, Topic topic){
        this.message=message;
        this.topic=topic;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
