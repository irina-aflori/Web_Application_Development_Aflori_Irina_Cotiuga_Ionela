package com.bogx.app.controller;

import com.bogx.app.model.Plant;
import com.bogx.app.model.PlantSpecies;
import com.bogx.app.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/plantSpecies")
public class PlantController {
    @Autowired
    private PlantService plantService;

    @GetMapping()
    public List<PlantSpecies> getAllPlantSpecies() {
        return plantService.getPlantSpeciesFromSparqlQuery();
    }
    @GetMapping("/plants")
    public List<Plant> getAllPlantsFromSpecies(@RequestParam String plantSpecies) {
        return plantService.getPlantsFromSpeciesFromSparqlQuery(plantSpecies);
    }
    @GetMapping("/plants/{plantId}")
    public Plant getPlantDetailsFromSpecies(@PathVariable String plantId, @RequestParam String plantName, @RequestParam String plantSpecies) {
        return plantService.getPlantDetailsFromSparqlQuery(plantId, plantName, plantSpecies);
    }
    @GetMapping("/seasonsRecommendations")
    public List<PlantSpecies> getPlantSpeciesFromSeasonRecommendations(@RequestParam List<String> seasons) {
        return plantService.getPlantSpeciesFromSeasonRecommendations(seasons);
    }
}
