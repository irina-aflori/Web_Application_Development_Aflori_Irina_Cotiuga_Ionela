package com.bogx.app.controller;

import com.bogx.app.model.Event;
import com.bogx.app.model.Person;
import com.bogx.app.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;
    @GetMapping()
    public List<Event> getEvents() {
        return eventService.getEventsFromSparqlQuery();
    }
    @PutMapping("/{eventId}/join")
    public void joinEvent(@PathVariable String eventId, @RequestBody Person person) {
        eventService.joinEvent(eventId, person);
    }
    @GetMapping("/{eventId}")
    public List<Person> getJoinedEventPersons(@PathVariable String eventId) {
        return eventService.getJoinedEventPersonsFromSparqlQuery(eventId);
    }
}
