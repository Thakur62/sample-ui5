package com.sap.receiving.kafka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;


@Service
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "my_topic";

    @PostConstruct
    public void init() {
        System.out.println("KafkaTemplate initialized: " + (kafkaTemplate != null));
    }

    public void sendMessage(String message) {
        System.out.println("kafkaTemplate" + kafkaTemplate);
        kafkaTemplate.send(TOPIC, message);
    }
}
