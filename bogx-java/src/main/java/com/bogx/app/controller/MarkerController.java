package com.bogx.app.controller;

import com.bogx.app.model.Marker;
import com.bogx.app.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/markers")
public class MarkerController {
    @Autowired
    private MarkerService markerService;

    @GetMapping()
    public List<Marker> getAllMarkers() {
        return markerService.getMarkersFromSparqlQuery();
    }

}
