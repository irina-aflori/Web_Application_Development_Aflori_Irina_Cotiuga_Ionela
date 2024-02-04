package com.bogx.app.service;

import com.bogx.app.model.Marker;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarkerService {
    public List<Marker> getMarkersFromSparqlQuery() {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?marker ?latitudeMarker ?longitudeMarker ?imageMarker\n" +
                "WHERE {\n" +
                "  ?marker a onto:Marker .\n" +
                "  ?marker onto:latitudeMarker ?latitudeMarker .\n" +
                "  ?marker onto:longitudeMarker ?longitudeMarker .\n" +
                "  ?marker onto:imageMarker ?imageMarker .\n" +
                "}";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/markers/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Marker> markers = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Marker marker = new Marker();
                marker.setLatitudeMarker(Double.valueOf(solution.getLiteral("latitudeMarker").getString()));
                marker.setLongitudeMarker(Double.valueOf(solution.getLiteral("longitudeMarker").getString()));
                marker.setImageMarker(solution.getLiteral("imageMarker").getString());
                markers.add(marker);
            }
            return markers;
        }
    }
}
