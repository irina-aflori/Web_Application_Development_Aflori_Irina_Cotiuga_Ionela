import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class plantRepository {
    /**
     * Get PlantSpecies
     * @returns {Promise}
     */
    static getPlantSpeciesFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/plantSpecies`,
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
            `${APP_CONFIG.URL.app}/plantSpecies/plants${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static getPlantDetailsFromSparqlQuery(query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/plantSpecies/plants/plantDetails${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static getPlantSpeciesFromSeasonRecommendations(query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/plantSpecies/seasonsRecommendations${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static getCommentToPlant(query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/feedback/feedbackPlant${helperService.serialize(query)}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static addCommentToPlant(plantId, query = {}) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/feedback/${plantId}/feedbackPlant${helperService.serialize(query)}`,
            {
                method: 'PUT',
            });            
    }
}

