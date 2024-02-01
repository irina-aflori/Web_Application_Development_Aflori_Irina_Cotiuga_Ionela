package com.bogx.app.controller;

import com.bogx.app.model.Tax;
import com.bogx.app.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/taxes")
public class TaxController {

    @Autowired
    private TaxService taxService;

    @GetMapping()
    public List<Tax> getAllTaxes() {
        return taxService.getTaxesFromSparqlQuery();
    }
}
