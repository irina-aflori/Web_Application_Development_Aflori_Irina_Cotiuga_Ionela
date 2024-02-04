package com.bogx.app.service;

import com.bogx.app.model.Event;
import com.bogx.app.model.Feedback;
import com.bogx.app.model.Person;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    public List<Event> getEventsFromSparqlQuery() {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?event ?eventId ?eventName ?eventDescription ?eventCapacity ?eventParticipantCount ?eventStartTime ?eventStopTime\n" +
                "WHERE {\n" +
                "  ?event a onto:Event .\n" +
                "  ?event onto:eventId ?eventId .\n" +
                "  ?event onto:eventName ?eventName .\n" +
                "  ?event onto:eventDescription ?eventDescription .\n" +
                "  ?event onto:eventCapacity ?eventCapacity .\n" +
                "  ?event onto:eventParticipantCount ?eventParticipantCount .\n" +
                "  ?event onto:eventStartTime ?eventStartTime .\n" +
                "  ?event onto:eventStopTime ?eventStopTime .\n" +
                "}";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/events/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Event> events = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Event event = new Event();
                event.setEventId(solution.getLiteral("eventId").getString());
                event.setEventName(solution.getLiteral("eventName").getString());
                event.setEventDescription(solution.getLiteral("eventDescription").getString());
                event.setEventCapacity(Integer.valueOf(solution.getLiteral("eventCapacity").getString()));
                event.setEventParticipantCount(Integer.valueOf(solution.getLiteral("eventParticipantCount").getString()));
                DateTimeFormatter originalFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                LocalDateTime dateStartTime = LocalDateTime.parse(solution.getLiteral("eventStartTime").getString(), originalFormatter);
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String eventDate = dateStartTime.format(dateFormatter);
                event.setEventDate(eventDate);
                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
                String timeStart = dateStartTime.format(timeFormatter);
                event.setEventStartTime(timeStart);
                LocalDateTime dateStopTime = LocalDateTime.parse(solution.getLiteral("eventStopTime").getString(), originalFormatter);
                String timeStop = dateStopTime.format(timeFormatter);
                event.setEventStopTime(timeStop);
                events.add(event);
            }
            return events;
        }
    }
    public void joinEvent(@PathVariable String eventId, @RequestBody Person person) {
        String updateQuery = buildUpdateJoinEventQuery(eventId, person);
        executeUpdate(updateQuery);
    }

    private void executeUpdate(String updateQuery) {
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(
                UpdateFactory.create(updateQuery), "http://localhost:3030/events/update");
        updateProcessor.execute();
    }

    private String buildUpdateJoinEventQuery(String eventId, Person person) {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
                "DELETE {\n" +
                "    ?event onto:eventParticipantCount ?currentCount .\n" +
                "}\n" +
                "INSERT {\n" +
                "    ?event onto:eventParticipantCount ?newCount .\n" +
                "    ?newPerson a onto:Person ; \n" +
                "               onto:firstNamePerson \"" + person.getFirstNamePerson().toString() + "\" ; \n" +
                "               onto:lastNamePerson \"" + person.getLastNamePerson() + "\" .\n" +
                "    ?event onto:hasParticipant ?newPerson .\n" +
                "}\n" +
                "WHERE {\n" +
                "    ?event onto:eventId \"" + eventId + "\" .\n" +
                "    OPTIONAL { ?event onto:eventParticipantCount ?currentCount . }\n" +
                "    BIND((IF(BOUND(?currentCount), xsd:integer(?currentCount) + 1, 1)) AS ?newCount)\n" +
                "    BIND(IRI(CONCAT(\"http://www.semanticweb.org/irina/ontologies/2024/0/bogx#Person_\", STRUUID())) AS ?newPerson)\n" +
                "}";

        return queryString;
    }
    public List<Person> getJoinedEventPersonsFromSparqlQuery(String eventId) {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?lastNamePerson ?firstNamePerson\n" +
                "WHERE {\n" +
                "    ?event a onto:Event .\n" +
                "    ?event onto:eventId \"" + eventId + "\" .\n" +
                "    ?event onto:hasParticipant ?person .\n" +
                "    ?person a onto:Person .\n" +
                "    ?person onto:lastNamePerson ?lastNamePerson .\n" +
                "    ?person onto:firstNamePerson ?firstNamePerson ." +
                "}";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/events/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Person> persons = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Person person = new Person();
                person.setLastNamePerson(solution.getLiteral("lastNamePerson").toString());
                person.setFirstNamePerson(solution.getLiteral("firstNamePerson").toString());
                persons.add(person);
            }
            return persons;
        }
    }
    public void addFeedbackToEvent(@PathVariable String eventId, @RequestBody Feedback feedback) {
        String updateQuery = buildUpdateFeedbackEventQuery(eventId, feedback);
        executeUpdate(updateQuery);
    }
    private String buildUpdateFeedbackEventQuery(String eventId, Feedback feedback) {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "INSERT {\n" +
                "?event onto:hasEventFeedback ?feedback .\n" +
                "?feedback a onto:EventFeedback ;  \n" +
                "            onto:feedbackName \"" + feedback.getFeedbackName() + "\" ; \n" +
                "            onto:feedbackComment \"" + feedback.getFeedbackComment() + "\" .\n" +
                "}\n" +
                "WHERE {\n" +
                "    ?event onto:eventId \"" + eventId + "\" .\n" +
                "    BIND(IRI(CONCAT(\"http://www.semanticweb.org/irina/ontologies/2024/0/bogx#EventFeedback\", STRUUID())) AS ?feedback)\n" +
                "}";

        return queryString;
    }
    public List<Feedback> getFeedbacksFromEvent(String eventId) {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?feedbackName ?feedbackComment\n" +
                "WHERE {\n" +
                "    ?event onto:eventId \"" + eventId + "\" .\n" +
                "    ?event onto:hasEventFeedback ?feedback .\n" +
                "    ?feedback onto:feedbackName ?feedbackName .\n" +
                "    ?feedback onto:feedbackComment ?feedbackComment .\n" +
                "}";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/events/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Feedback> feedbacks = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Feedback feedback = new Feedback();
                feedback.setFeedbackName(solution.getLiteral("feedbackName").toString());
                feedback.setFeedbackComment(solution.getLiteral("feedbackComment").toString());
                feedbacks.add(feedback);
            }
            return feedbacks;
        }
    }
}
