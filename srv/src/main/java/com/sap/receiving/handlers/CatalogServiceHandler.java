package com.sap.receiving.handlers;

import java.util.stream.Stream;

import cds.gen.catalogservice.*;
import com.sap.cds.ql.cqn.CqnAnalyzer;
import com.sap.cds.services.messages.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.reflect.CdsModel;
import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.receiving.kafka.KafkaProducer;


@Component
@ServiceName(CatalogService_.CDS_NAME)
public class CatalogServiceHandler implements EventHandler {

	@Autowired
    private KafkaProducer kafkaProducer;

	private final Messages messages;

//	@Autowired
//	CdsModel model;

	private final CqnAnalyzer analyzer;


    CatalogServiceHandler(CdsModel model, Messages messages) {
		this.messages = messages;
		this.analyzer = CqnAnalyzer.create(model);
	}


	@After(event = CqnService.EVENT_READ)
	public void discountBooks(Stream<Books> books) {
		books.filter(b -> b.getTitle() != null && b.getStock() != null)
		.filter(b -> b.getStock() > 200)
		.forEach(b -> b.setTitle(b.getTitle() + " (discounted)"));
	}

	@On(event = CqnService.EVENT_CREATE)
    public void onCreate(CdsCreateEventContext context, Books book) {
		try{
			kafkaProducer.sendMessage("New book created: " + book.getTitle());
		} catch (Exception e) {
			System.err.println("--->>>"+ e);
		}    
    }

	@On(entity = Books_.CDS_NAME)
	public void onAddReview(BooksAddReviewContext context) {
		Integer bookId = (Integer) analyzer.analyze(context.getCqn()).targetKeys().get(Books.ID);
		String text = context.getText();
		System.out.println("bookId -->>> "+bookId + "text -->>>" + text);
		messages.success("Hope it works!!!");
		context.setResult("success");
	}

	@On
	public void onSubmitTitle(SubmitTitleContext context) {
		String title = context.getTitle();
		context.setResult(title);

	}



	}