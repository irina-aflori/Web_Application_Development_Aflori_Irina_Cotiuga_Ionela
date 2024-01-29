//package com.bogx.app.controller;
//
//import com.bogx.app.model.Plant;
//import com.bogx.app.service.PlantService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping(value = "/api/plants")
//public class PlantController {
//    @Autowired
//    private PlantService plantService;
//
//    @RequestMapping(method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    protected List<Plant> getAllPlants(@RequestParam String plantSpecies) {
//        return plantService.getPlantsData(plantSpecies);
//    }
//}
