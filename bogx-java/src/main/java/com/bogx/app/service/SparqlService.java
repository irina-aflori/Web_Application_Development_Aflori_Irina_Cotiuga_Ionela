package com.bogx.app.service;

import com.bogx.app.model.Marker;
import com.bogx.app.model.Plant;
import com.bogx.app.model.PlantSpecies;
import com.bogx.app.model.Tax;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SparqlService {
    public List<Tax> getTaxesFromSparqlQuery() {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?gardenTax ?taxName ?taxPrice\n" +
                "WHERE {\n" +
                "  ?gardenTax a onto:GardenTax .\n" +
                "  ?gardenTax onto:taxName ?taxName .\n" +
                "  ?gardenTax onto:taxPrice ?taxPrice .\n" +
                "}\n";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/taxes/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Tax> taxes = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Tax tax = new Tax();
                tax.setTaxName(solution.getLiteral("taxName").getString());
                tax.setTaxPrice(solution.getLiteral("taxPrice").getString());
                taxes.add(tax);
            }
            return taxes;
        }
    }

    public List<PlantSpecies> getPlantSpeciesFromSparqlQuery() {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?plantSpecies ?plantSpeciesName ?plantSpeciesImageURL\n" +
                "WHERE {\n" +
                "  ?plantSpecies a onto:PlantSpecies .\n" +
                "  ?plantSpecies onto:plantSpeciesName ?plantSpeciesName .\n" +
                "  ?plantSpecies onto:plantSpeciesImageURL ?plantSpeciesImageURL .\n" +
                "}\n";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/plantSpecies/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<PlantSpecies> plantSpeciesList = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                PlantSpecies plantSpecies = new PlantSpecies();
                plantSpecies.setPlantSpeciesName(solution.getLiteral("plantSpeciesName").getString());
                plantSpecies.setPlantSpeciesImageURL(solution.getLiteral("plantSpeciesImageURL").getString());
                plantSpeciesList.add(plantSpecies);
            }
            return plantSpeciesList;
        }
    }

    public List<Plant> getPlantsFromSpeciesFromSparqlQuery(String plantSpecies) {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>"
                + "PREFIX dbr: <http://dbpedia.org/resource/>"
                + "SELECT ?plant ?plantName ?plantDescription ?plantImageURL "
                + "WHERE { "
                + "  ?plant a onto:Plant ;"
                + "         onto:plantName ?plantName ;"
                + "         onto:plantDescription ?plantDescription ;"
                + "         onto:plantImageURL ?plantImageURL ;"
                + "         onto:isPartOf dbr:" + plantSpecies + " ."
                + "}";

        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/plants/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Plant> plants = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Plant plant = new Plant();
                plant.setPlantName(solution.getLiteral("plantName").getString());
                plant.setPlantDescription(solution.getLiteral("plantDescription").getString());
                plant.setPlantImageURL(solution.getLiteral("plantImageURL").getString());
                plants.add(plant);
            }
            return plants;
        }
    }

    public Plant getPlantDetailsFromSparqlQuery(String plantName, String plantSpecies) {
        String encodedPlantName = plantName.replace(" ", "_");
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>"
                + "PREFIX dbr: <http://dbpedia.org/resource/>"
                + "SELECT ?plantDescription ?plantImageURL ?latitudeMarker ?longitudeMarker "
                + "WHERE { "
                + " onto:" + encodedPlantName + " a onto:Plant ;"
                + "         onto:plantDescription ?plantDescription ;"
                + "         onto:plantImageURL ?plantImageURL ;"
                + "         onto:isPartOf dbr:" + plantSpecies + " ."
                + "         dbr:" + plantSpecies + " onto:hasMarker ?marker .\n" +
                "           ?marker onto:latitudeMarker ?latitudeMarker .\n" +
                "           ?marker onto:longitudeMarker ?longitudeMarker ."
                + "}";
//        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>"
//                + " PREFIX dbr: <http://dbpedia.org/resource/>"
//                + " SELECT ?plant ?latitudeMarker ?longitudeMarker "
//                + "WHERE { "
//                + "  ?plant a onto:Plant ;"
//                + "         onto:isPartOf dbr:" + plantSpecies + " ."
//                + "         dbr:" + plantSpecies + " onto:hasMarker ?marker .\n" +
//                "           ?marker onto:latitudeMarker ?latitudeMarker .\n" +
//                "           ?marker onto:longitudeMarker ?longitudeMarker ."
//                + "}";

        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/plants/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            Plant plant = new Plant();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                plant.setPlantName(plantName);
                plant.setPlantDescription(solution.getLiteral("plantDescription").getString());
                plant.setPlantImageURL(solution.getLiteral("plantImageURL").getString());
                plant.setLatitudeMarker(Double.valueOf(solution.getLiteral("latitudeMarker").getString()));
                plant.setLongitudeMarker(Double.valueOf(solution.getLiteral("longitudeMarker").getString()));
            }
            return plant;
        }
    }

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
