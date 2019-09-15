package com.calendarapp.calendarapp.database;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EventsEndpoint {

    @GetMapping("/test")
    @ResponseBody
    public String getEvents() {
        return "hi man";
    }
}
