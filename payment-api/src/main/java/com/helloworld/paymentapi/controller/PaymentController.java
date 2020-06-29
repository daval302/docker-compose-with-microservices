package com.helloworld.paymentapi.controller;

import com.helloworld.paymentapi.data.PaymentRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping(path = "/payment-api", consumes = MediaType.APPLICATION_JSON_VALUE)
public class PaymentController
{

    @GetMapping
    public HashMap<String, String> welcome()
    {
        return new HashMap<String, String>()
        {{
            put("message", "Welcome");
        }};
    }

    @PostMapping(value = "/pay")
    public void pay(@RequestBody PaymentRequest paymentRequest)
    {
        // TODO - simulate external service payment call and callback
    }
}
