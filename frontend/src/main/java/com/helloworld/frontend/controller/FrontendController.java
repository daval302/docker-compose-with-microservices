package com.helloworld.frontend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(path = "/")
public class FrontendController
{

    @GetMapping
    public String welcome()
    {
        return "index";
    }
}
