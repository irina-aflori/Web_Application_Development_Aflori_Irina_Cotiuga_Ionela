//package com.bogx.app.service;
//
//import com.bogx.app.model.PlantSpecies;
//import org.apache.jena.ontology.Individual;
//import org.apache.jena.ontology.OntClass;
//import org.apache.jena.ontology.OntModel;
//import org.apache.jena.ontology.OntModelSpec;
//import org.apache.jena.rdf.model.ModelFactory;
//import org.apache.jena.rdf.model.Property;
//import org.apache.jena.rdf.model.RDFNode;
//import org.apache.jena.util.FileManager;
//import org.apache.jena.util.iterator.ExtendedIterator;
//import org.springframework.stereotype.Service;
//
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class PlantSpeciesService {
//
//    private OntModel model;
//
//    public PlantSpeciesService() {
//        model = ModelFactory.createOntologyModel();
//        FileManager.get().readModel(model, "D:\\Master\\an1\\Dezvoltarea_Aplicatiilor_Web\\Resurse_curs\\owl\\bogx_updated.rdf");
//
//    }
//    public List<PlantSpecies> getPlantSpeciesData() {
//        String namespace = "http://www.semanticweb.org/irina/ontologies/2024/0/bogx#";
//        List<PlantSpecies> plantSpecies = new ArrayList<>();
//
//        OntClass plantSpeciesClass = model.getOntClass(namespace + "PlantSpecies");
//        Property nameProp = model.getProperty(namespace + "plantSpeciesName");
//        Property imageUrlProp = model.getProperty(namespace + "plantSpeciesImageURL");
//
//        ExtendedIterator<Individual> individuals = (ExtendedIterator<Individual>) plantSpeciesClass.listInstances();
//        while (individuals.hasNext()) {
//            Individual individual = individuals.next();
//            String name = getPropertyAsString(individual, nameProp);
//            String imageUrl = getPropertyAsString(individual, imageUrlProp);
//
//            if (name != null && imageUrl != null) {
//                plantSpecies.add(new PlantSpecies(name, imageUrl));
//            }
//        }
//        return plantSpecies;
//
//    }
//    private String getPropertyAsString(Individual individual, Property property) {
//        RDFNode node = individual.getPropertyValue(property);
//        return node != null ? node.asLiteral().getString() : null;
//    }
//}
