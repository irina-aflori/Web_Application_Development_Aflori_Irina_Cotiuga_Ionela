package com.bogx.app.service;

import com.bogx.app.model.Tax;
import org.apache.jena.query.*;
import org.apache.jena.sparql.exec.http.QueryExecutionHTTP;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaxService {
    public List<Tax> getTaxesFromSparqlQuery() {
        String queryString = "PREFIX onto: <http://www.semanticweb.org/irina/ontologies/2024/0/bogx#>\n" +
                "SELECT ?gardenTax ?taxName ?taxPrice\n" +
                "WHERE {\n" +
                "  ?gardenTax a onto:GardenTax .\n" +
                "  ?gardenTax onto:taxName ?taxName .\n" +
                "  ?gardenTax onto:taxPrice ?taxPrice .\n" +
                "}\n";
        Query query = QueryFactory.create(queryString);
        try (QueryExecution qe = QueryExecutionHTTP.service("http://localhost:3030/taxes/query").query(query).build();
        ) {
            ResultSet results = qe.execSelect();
            List<Tax> taxes = new ArrayList<>();
            while (results.hasNext()) {
                QuerySolution solution = results.nextSolution();
                Tax tax = new Tax();
                tax.setTaxName(solution.getLiteral("taxName").getString());
                tax.setTaxPrice(solution.getLiteral("taxPrice").getString());
                taxes.add(tax);
            }
            return taxes;
        }
    }
}
