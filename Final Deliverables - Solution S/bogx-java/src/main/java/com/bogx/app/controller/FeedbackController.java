package com.bogx.app.controller;

import com.bogx.app.model.Feedback;
import com.bogx.app.service.FeedbackPlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackPlantService feedbackPlantService;

    @PutMapping("/{plantId}/feedbackPlant")
    public void insertPlantFeedback(@PathVariable String plantId, @RequestParam String comment, @RequestParam String image) throws IOException, InterruptedException {
        feedbackPlantService.addFeddback(plantId, comment, image);
    }

    @GetMapping("feedbackPlant")
    public List<Feedback> getPlantFeedback(){
        return feedbackPlantService.getFeedbackFromSparqlQuery();
    }
}
