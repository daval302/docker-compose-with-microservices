package com.helloworld.paymentapi.controller;

import com.helloworld.paymentapi.data.Checkout;
import com.helloworld.paymentapi.data.PaymentRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

import static java.lang.Thread.sleep;
import static java.util.Objects.requireNonNull;
import static org.springframework.http.HttpStatus.NOT_MODIFIED;
import static org.springframework.http.HttpStatus.OK;
import static reactor.core.publisher.Mono.just;

@RestController
@RequestMapping(path = "/payment-api", consumes = MediaType.APPLICATION_JSON_VALUE)
public class PaymentController
{
    private static final Logger LOG = LoggerFactory.getLogger(PaymentController.class);

    @Value("${data-api.baseUrl}")
    private String dataApiUrl;

    @GetMapping
    public HashMap<String, String> welcome()
    {
        return new HashMap<String, String>()
        {{
            put("message", "Welcome");
        }};
    }

    @PostMapping(value = "/pay")
    public ResponseEntity<?> pay(@RequestBody PaymentRequest paymentRequest) throws InterruptedException
    {
        // Random payment process
        int waitForPay = ThreadLocalRandom.current().nextInt(5);
        boolean paid = ThreadLocalRandom.current().nextBoolean();

        // Fetch checkout
        WebClient webClient = WebClient.create(dataApiUrl);
        Checkout checkout = webClient.get()
                                     .uri("/checkouts/" + paymentRequest.getCheckoutId())
                                     .retrieve()
                                     .bodyToMono(Checkout.class)
                                     .block();

        // simulate successful payment
        sleep(waitForPay * 1000);
        if (paid)
        {
            // update
            requireNonNull(checkout).setState("PAID");
            Checkout updatedCheckout = webClient.put()
                                                .uri("/checkouts/" + paymentRequest.getCheckoutId())
                                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                                .body(just(checkout), Checkout.class)
                                                .retrieve()
                                                .bodyToMono(Checkout.class)
                                                .block();
            LOG.info("Successfully PAID checkout id {} with data: {}", paymentRequest.getCheckoutId(), updatedCheckout);
            return new ResponseEntity<>(updatedCheckout, OK);
        }

        LOG.error("Unsuccessful payment for checkout id {} with data: {}", paymentRequest.getCheckoutId(), checkout);
        return new ResponseEntity<>(checkout, NOT_MODIFIED);
    }
}
