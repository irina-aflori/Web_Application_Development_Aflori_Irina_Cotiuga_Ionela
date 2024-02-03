package com.bogx.app.service;

import com.bogx.app.model.Feedback;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackPlantService {
    public List<Feedback> getFeedbackFromSparqlQuery(){
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?feedback ?feedbackComment ?feedbackImage ?feedbackDate\n" +
                "WHERE {\n" +
                "  ?feedback a onto:PlantFeedback ;\n" +
                "              onto:feedbackComment ?feedbackComment ;\n" +
                "              onto:feedbackImage ?feedbackImage ;\n" +
                "              onto:feedbackDate ?feedbackDate .\n" +
                "}";

        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/plantFeedback/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Feedback> feecbacks = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Feedback feedback = new Feedback();
                feedback.setFeedbackComment(solution.getLiteral("feedbackComment").getString());
                feedback.setFeedbackImage(solution.getLiteral("feedbackImage").getString());

                String feedbackDateString = solution.getLiteral("feedbackDate").getString();
                DateTimeFormatter originalFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate date = LocalDate.parse(feedbackDateString, originalFormatter);
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String formattedDate = date.format(dateFormatter);
                feedback.setFeedbackDate(formattedDate);

                feecbacks.add(feedback);
            }
            return feecbacks;
        }
    }

    public void addFeddback(@PathVariable String plantId, String comment, String image) throws IOException, InterruptedException {
        String imageUrlString = ImportPhotoService.uploadImage(image);
        String imageUrl = imageUrlString.replace("\\/", "/");
        String insertQuery = buildInsertQuery(plantId, comment, imageUrl);
        executeInsert(insertQuery);
    }

    public void executeInsert(String insertQuery) {
        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(
                UpdateFactory.create(insertQuery), "http://localhost:3030/plantFeedback/update");
        updateProcessor.execute();
    }

    public String buildInsertQuery(String plantId, String comment, String imageUrl) {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String currentDateString = currentDate.format(formatter);

        Feedback feedback = new Feedback();
        feedback.setFeedbackImage(imageUrl);
        feedback.setFeedbackComment(comment);
        feedback.setFeedbackDate(currentDateString);

        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
                "INSERT {\n" +
                "?plant onto:hasPlantFeedback ?feedback .\n" +
                "?feedback a onto:PlantFeedback ; \n" +
                "               onto:feedbackImage \"" + feedback.getFeedbackImage() + "\" ; \n" +
                "               onto:feedbackComment \"" + feedback.getFeedbackComment() + "\" ;\n" +
                "               onto:feedbackDate \"" + feedback.getFeedbackDate() + "\"^^xsd:date .\n" +
                "}\n" +
                "WHERE {\n" +
                "   ?plant onto:plantId \"" + plantId + "\" .\n" +
                "   BIND(IRI(CONCAT(\"http://www.semanticweb.org/irina/ontologies/2024/0/bogx#PlantFeedback_\", STRUUID())) AS ?feedback)\n" +
                "}";

        return queryString;
    }
}
