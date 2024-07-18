package com.sap.receiving.handlers;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.receiving.kafka.KafkaProducer;

import cds.gen.catalogservice.CatalogService_;
import cds.gen.catalogservice.Books;

@Component
@ServiceName(CatalogService_.CDS_NAME)
public class CatalogServiceHandler implements EventHandler {

	@Autowired
    private KafkaProducer kafkaProducer;

	@After(event = CqnService.EVENT_READ)
	public void discountBooks(Stream<Books> books) {
		books.filter(b -> b.getTitle() != null && b.getStock() != null)
		.filter(b -> b.getStock() > 200)
		.forEach(b -> b.setTitle(b.getTitle() + " (discounted)"));
	}

	@On(event = CqnService.EVENT_CREATE)
    public void onCreate(CdsCreateEventContext context, Books book) {
		System.out.println("WHY YOU DO NOT SEE ME !!!!!");
		try{
			kafkaProducer.sendMessage("New book created: " + book.getTitle());
		} catch (Exception e) {
			System.err.println("I will print anything, Once Kafka set up is done !!!"+ e);
		}    
    }

}