package com.bogx.app.service;

import com.bogx.app.model.Plant;
import com.bogx.app.model.PlantSpecies;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlantService {
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
                + "SELECT ?plant ?plantId ?plantName ?plantDescription ?plantImageURL "
                + "WHERE { "
                + "  ?plant a onto:Plant ;"
                + "         onto:plantId ?plantId ;"
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
                plant.setPlantId(solution.getLiteral("plantId").getString());
                plant.setPlantName(solution.getLiteral("plantName").getString());
                plant.setPlantDescription(solution.getLiteral("plantDescription").getString());
                plant.setPlantImageURL(solution.getLiteral("plantImageURL").getString());
                plants.add(plant);
            }
            return plants;
        }
    }

    public Plant getPlantDetailsFromSparqlQuery(String plantId, String plantName, String plantSpecies) {
        String encodedPlantName = plantName.replace(" ", "_");
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>"
                + "PREFIX dbr: <http://dbpedia.org/resource/>"
                + "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"
                + "SELECT ?plantDescription ?plantImageURL ?plantDiseases ?plantMaintenance ?latitudeMarker ?longitudeMarker (GROUP_CONCAT(DISTINCT ?season; separator=\", \") AS ?seasons) "
                + "WHERE { "
                + " onto:" + encodedPlantName + " a onto:Plant ;"
                + "         onto:plantDescription ?plantDescription ;"
                + "         onto:plantImageURL ?plantImageURL ;"
                + "         onto:plantDiseases ?plantDiseases ;"
                + "         onto:plantMaintenance ?plantMaintenance ;"
                + "         onto:isPartOf dbr:" + plantSpecies + " ."
                + "         dbr:" + plantSpecies + " onto:hasMarker ?marker .\n" +
                "           ?marker onto:latitudeMarker ?latitudeMarker .\n" +
                "           ?marker onto:longitudeMarker ?longitudeMarker ."
                + " dbr:" + plantSpecies + " onto:occursInSeason ?season ."
//                + " ?seasonInstance rdf:type onto:Season ."
                + "}"
                + "GROUP BY ?plantDescription ?plantImageURL ?plantDiseases ?plantMaintenance ?latitudeMarker ?longitudeMarker";

        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/plants/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            Plant plant = new Plant();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                plant.setPlantName(plantName);
                plant.setPlantId(plantId);
                plant.setPlantDescription(solution.getLiteral("plantDescription").getString());
                plant.setPlantImageURL(solution.getLiteral("plantImageURL").getString());
                plant.setPlantDiseases(solution.getLiteral("plantDiseases").getString());
                plant.setPlantMaintenance(solution.getLiteral("plantMaintenance").getString());
                plant.setLatitudeMarker(Double.valueOf(solution.getLiteral("latitudeMarker").getString()));
                plant.setLongitudeMarker(Double.valueOf(solution.getLiteral("longitudeMarker").getString()));
                String seasonUris = solution.getLiteral("seasons").getString();

                String[] uris = seasonUris.split(", ");
                StringBuilder seasonsBuilder = new StringBuilder();
                for (int i = 0; i < uris.length; i++) {
                    String[] parts = uris[i].split("#");
                    if (parts.length > 1) {
                        seasonsBuilder.append(parts[1]);
                        if (i < uris.length - 1) {
                            seasonsBuilder.append(", ");
                        }
                    }
                }
                plant.setSeasons(seasonsBuilder.toString());
            }
            return plant;
        }
    }
    private String buildSparqlQueryForSeasons(List<String> seasons) {
        StringBuilder valuesClause = new StringBuilder("VALUES ?seasonInstance { ");
        for (String season : seasons) {
            valuesClause.append("onto:").append(season).append(" ");
        }
        valuesClause.append("}");

        return "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#> \n" +
                "SELECT DISTINCT ?plantSpecies ?plantSpeciesName ?plantSpeciesImageURL \n" +
                "WHERE { \n" +
                valuesClause + "\n" +
                "    ?plantSpecies a onto:PlantSpecies .\n" +
                "    ?plantSpecies onto:occursInSeason ?seasonInstance .\n" +
                "  ?plantSpecies onto:plantSpeciesName ?plantSpeciesName .\n" +
                "  ?plantSpecies onto:plantSpeciesImageURL ?plantSpeciesImageURL .\n" +
                "}";
    }

    public List<PlantSpecies> getPlantSpeciesFromSeasonRecommendations(List<String> seasons) {
        String queryString = buildSparqlQueryForSeasons(seasons);
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/seasons/query").query(query).build();
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
}
