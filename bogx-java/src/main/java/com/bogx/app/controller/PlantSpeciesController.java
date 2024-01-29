//package com.bogx.app.controller;
//
//import com.bogx.app.model.PlantSpecies;
//import com.bogx.app.service.PlantSpeciesService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping(value = "/api/plantSpecies")
//public class PlantSpeciesController {
//
//    @Autowired
//    private PlantSpeciesService plantSpeciesService;
//
//    @RequestMapping(method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    protected List<PlantSpecies> getAllPlantSpecies() {
//        return plantSpeciesService.getPlantSpeciesData();
//    }
//
//}
