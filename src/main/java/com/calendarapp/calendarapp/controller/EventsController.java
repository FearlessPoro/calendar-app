package com.calendarapp.calendarapp.controller;

import com.calendarapp.calendarapp.repository.EventRepository;
import com.calendarapp.calendarapp.Model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
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
            startDate = new SimpleDateFormat("yyyy-MM-dd kk:mm").parse(date + " 00:00:00");
            endDate = new SimpleDateFormat("yyyy-MM-dd kk:mm").parse(date + " 23:59:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        assert startDate != null;
        assert endDate != null;
        return repository.findAllByTimestampGreaterThanEqualAndTimestampLessThanEqual(new Timestamp(startDate.getTime()), new Timestamp(endDate.getTime()));
    }

    @PostMapping("/SaveEvent")
    @CrossOrigin(origins = "http://localhost:3000")
    public void  set(@RequestParam("timestamp") String timestamp, @RequestParam("title") String title, @RequestParam("info") String info) {
        Event event = new Event();
        event.setInfo(info);
        event.setTitle(title);
        event.setTimestamp(Timestamp.valueOf(timestamp));
        event.setUser_ID(1);
        repository.save(event);

    }
}
