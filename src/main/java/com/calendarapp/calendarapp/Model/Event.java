package com.calendarapp.calendarapp.Model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Events")
public class Event implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long event_ID;

    @Column(name = "Info")
    private String info;

    @Column(name = "Title")
    private String title;

    @Column(name = "Timestamp")
    private Timestamp timestamp;

    @Column(name="User_id")
    private long user_ID;


    public long getEvent_ID() {
        return event_ID;
    }

    public void setEvent_ID(long event_ID) {
        this.event_ID = event_ID;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public long getUser_ID() {
        return user_ID;
    }

    public void setUser_ID(long user_ID) {
        this.user_ID = user_ID;
    }
}
