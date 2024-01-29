package com.bogx.app.controller;

import com.bogx.app.model.Marker;
import com.bogx.app.model.Plant;
import com.bogx.app.model.PlantSpecies;
import com.bogx.app.model.Tax;
import com.bogx.app.service.SparqlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sparql")
public class SparqlController {
    @Autowired
    private SparqlService sparqlService;

    @GetMapping("/taxes")
    public List<Tax> getAllTaxes() {
        return sparqlService.getTaxesFromSparqlQuery();
    }
    @GetMapping("/markers")
    public List<Marker> getAllMarkers() {
        return sparqlService.getMarkersFromSparqlQuery();
    }
    @GetMapping("/plantSpecies")
    public List<PlantSpecies> getAllPlantSpecies() {
        return sparqlService.getPlantSpeciesFromSparqlQuery();
    }
    @GetMapping("/plants")
    public List<Plant> getAllPlantsFromSpecies(@RequestParam String plantSpecies) {
        return sparqlService.getPlantsFromSpeciesFromSparqlQuery(plantSpecies);
    }
    @GetMapping("/plantDetails")
    public Plant getPlantDetailsFromSpecies(@RequestParam String plantName, @RequestParam String plantSpecies) {
        return sparqlService.getPlantDetailsFromSparqlQuery(plantName, plantSpecies);
    }

}
