package com.calendarapp.calendarapp.repository;

import com.calendarapp.calendarapp.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Repository
@Transactional
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAll();
    List<Event> findAllByTimestampGreaterThanEqualAndTimestampLessThanEqual(Timestamp startDate, Timestamp endDate);

}
