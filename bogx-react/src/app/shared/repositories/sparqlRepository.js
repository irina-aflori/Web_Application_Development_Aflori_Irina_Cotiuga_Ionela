import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class sparqlRepository {
    /**
     * Get Taxes
     * @returns {Promise}
     */
    static getTaxesFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/sparql/taxes`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    /**
     * Get PlantSpecies
     * @returns {Promise}
     */
    static getPlantSpeciesFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/sparql/plantSpecies`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    /**
     * Get Plants from Species
     * @returns {Promise}
     * @param query
     */
    static getPlantsFromSpeciesFromSparqlQuery(query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/sparql/plants${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    /**
     * Get Markers
     * @returns {Promise}
     */
    static getMarkersFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/sparql/markers`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static getPlantDetailsFromSparqlQuery(query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/sparql/plantDetails${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
}

