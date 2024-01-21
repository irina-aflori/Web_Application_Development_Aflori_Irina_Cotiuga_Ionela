package com.bogx.app;

import org.apache.jena.ontology.Individual;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.util.FileManager;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class OntologyUpdater {
    public static void updateOntologyPlantSpecies(String ontologyURI, String ontologyFilePath) throws FileNotFoundException{
        String sparqlEndpoint = "http://dbpedia.org/sparql";
        String chrysanthemumURI = "http://dbpedia.org/resource/Chrysanthemum";

        String queryString = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                "PREFIX dbr: <http://dbpedia.org/resource/>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT ?label ?thumbnail\n" +
                "WHERE {\n" +
                "  dbr:Chrysanthemum rdfs:label ?label ;\n" +
                "                    dbo:thumbnail ?thumbnail .\n" +
                "  FILTER (LANG(?label) = \"en\")\n" +
                "}";

        Query query = QueryFactory.create(queryString);
        QueryExecution qe = QueryExecutionFactory.sparqlService(sparqlEndpoint, query);
        ResultSet results = qe.execSelect();

        // Load the ontology model
        OntModel model = ModelFactory.createOntologyModel();
        FileManager.get().readModel(model, ontologyFilePath);

        // Define the PlantSpecies class and properties
        OntClass plantSpeciesClass = model.getOntClass(ontologyURI + "PlantSpecies");
        Property nameProperty = model.getDatatypeProperty(ontologyURI + "plantSpeciesName");
        Property imageURLProperty = model.getDatatypeProperty(ontologyURI + "plantSpeciesImageURL");

        // Process query results and update ontology
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            String label = soln.getLiteral("label").getString();
            String imageURL = soln.getResource("thumbnail").getURI();

            // Create or update an individual in the PlantSpecies class
            Individual plantIndividual = model.createIndividual(chrysanthemumURI, plantSpeciesClass);
            plantIndividual.addProperty(nameProperty, label);
            plantIndividual.addProperty(imageURLProperty, imageURL);
        }

        // Save the updated ontology model
//        model.write(System.out, "RDF/XML");
        // Or save to a file
//         model.write(new FileOutputStream(ontologyFilePath), "RDF/XML");

        qe.close();
    }

    public static void updateOntologyPlants(String ontologyURI, String ontologyFilePath) throws FileNotFoundException{
        String sparqlEndpoint = "http://dbpedia.org/sparql";
        OntModel model = ModelFactory.createOntologyModel();
        FileManager.get().readModel(model, ontologyFilePath);

        String queryString = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                "PREFIX dbr: <http://dbpedia.org/resource/>\n" +
                "PREFIX dct: <http://purl.org/dc/terms/>\n" +
                "PREFIX dbc: <http://dbpedia.org/resource/Category:>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "\n" +
                "SELECT ?chrysanthemumType ?label ?abstract ?thumbnail\n" +
                "WHERE {\n" +
                "  \t?chrysanthemumType dct:subject dbc:Chrysanthemum .\n" +
                "\t?chrysanthemumType rdfs:label ?label . FILTER (LANG(?label) = \"en\") .\n" +
                "\t?chrysanthemumType dbo:abstract ?abstract . FILTER (LANG(?abstract) = \"en\") .\n" +
                "    ?chrysanthemumType dbo:thumbnail ?thumbnail .\n" +
                "    FILTER (?label != \"Chrysanthemum tea\"@en && ?label != \"Chrysanthemum exhibition\"@en && ?label != \"Chrysanthemum × morifolium\"@en)\n" +
                "}\n";

                Query query = QueryFactory.create(queryString);
        try (QueryExecution qexec = QueryExecutionFactory.sparqlService(sparqlEndpoint, query)) {
            ResultSet results = qexec.execSelect();

            while (results.hasNext()) {
                QuerySolution soln = results.nextSolution();
                String label = soln.getLiteral("label").getString();
                String abstractText = soln.getLiteral("abstract").getString();
                String thumbnail = soln.getResource("thumbnail").getURI();

                // Create a new individual of class Plant
                Individual plant = model.createIndividual(ontologyURI + label.replace(" ", "_"), model.getOntClass(ontologyURI + "Plant"));
                plant.addProperty(model.getProperty(ontologyURI + "plantName"), label);
                plant.addProperty(model.getProperty(ontologyURI + "plantDescription"), abstractText);
                plant.addProperty(model.getProperty(ontologyURI + "plantImageURL"), thumbnail);

                // Link to PlantSpecies Chrysanthemum
                Individual chrysanthemum = model.getIndividual("http://dbpedia.org/resource/" + "Chrysanthemum");
                plant.addProperty(model.getObjectProperty(ontologyURI + "isPartOf"), chrysanthemum);
            }
        }

        // Save the updated model
//        model.write(System.out, "RDF/XML");
//         model.write(new FileOutputStream(ontologyFilePath), "RDF/XML");
    }

    public static void main(String[] args) throws FileNotFoundException {
//        updateOntologyPlantSpecies("http://www.semanticweb.org/irina/ontologies/2024/0/bogx#", "D:\\Master\\an1\\Dezvoltarea_Aplicatiilor_Web\\Resurse_curs\\owl\\bogx_updated.rdf");
//        updateOntologyPlants("http://www.semanticweb.org/irina/ontologies/2024/0/bogx#", "D:\\Master\\an1\\Dezvoltarea_Aplicatiilor_Web\\Resurse_curs\\owl\\bogx_updated.rdf");
    }
}
