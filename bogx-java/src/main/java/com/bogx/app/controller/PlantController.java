package com.bogx.app.controller;

import com.bogx.app.model.Plant;
import com.bogx.app.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/plants")
public class PlantController {
    @Autowired
    private PlantService plantService;

    @RequestMapping(method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    protected List<Plant> getAllPlants() {
        return plantService.getPlantsData();
    }
}
