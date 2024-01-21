package com.bogx.app.service;

import com.bogx.app.model.Plant;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.FileManager;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlantService {
    private OntModel model;

    public PlantService() {
        model = ModelFactory.createOntologyModel();
        FileManager.get().readModel(model, "D:\\Master\\an1\\Dezvoltarea_Aplicatiilor_Web\\Resurse_curs\\owl\\bogx_updated.rdf");
    }
    public List<Plant> getPlantsData() {
        String queryString = "PREFIX : <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>"
                + "PREFIX dbr: <http://dbpedia.org/resource/>"
                + "SELECT ?plant ?plantName ?plantDescription ?plantImageURL "
                + "WHERE { "
                + "  ?plant a :Plant ;"
                + "         :plantName ?plantName ;"
                + "         :plantDescription ?plantDescription ;"
                + "         :plantImageURL ?plantImageURL ;"
                + "         :isPartOf dbr:" + "Chrysanthemum" + " ."
                + "}";

        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();

        List<Plant> plants = new ArrayList<>();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            Plant plant = new Plant();
            plant.setPlantName(soln.getLiteral("plantName").getString());
            plant.setPlantDescription(soln.getLiteral("plantDescription").getString());
            plant.setPlantImageURL(soln.getLiteral("plantImageURL").getString());
            plants.add(plant);
        }
        qexec.close();

        return plants;
    }
}
