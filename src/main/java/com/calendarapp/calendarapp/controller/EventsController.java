package com.calendarapp.calendarapp.controller;

import com.calendarapp.calendarapp.repository.EventRepository;
import com.calendarapp.calendarapp.Model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class EventsController {

    @Autowired
    EventRepository repository;

//    public String saveEvent(@RequestBody EventUI event) {
//        repository.save(new Event(event.getTimestamp()))
//    }
    @GetMapping("/EventsList")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Event> findAll() {

        return repository.findAll();
    }
    @GetMapping("/EventsOn/{date}")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Event> findAllByTimestampBetween(@PathVariable String date) {
        Date startDate = null;
        Date endDate = null;
        try {
            startDate = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(date + " 00:00");
            endDate = new SimpleDateFormat("yyyy-MM-dd kk:mm").parse(date + " 24:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        assert endDate != null;
        return repository.findAllByTimestampBetween(new Timestamp(startDate.getTime()), new Timestamp(endDate.getTime()));
    }

    @PostMapping("/SaveEvent")
    public void  set(@RequestParam("Timestamp") String timestamp, @RequestParam("Title") String title, @RequestParam("info") String info) {
        Event event = new Event();
        event.setInfo(info);
        event.setTitle(title);
        event.setTimestamp(Timestamp.valueOf(timestamp));
        repository.save(event);

    }
}
