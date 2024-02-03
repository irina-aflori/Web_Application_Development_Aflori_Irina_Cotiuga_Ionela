import {plantRepository} from "../repositories/plantRepository";

class PlantService {
    getPlantSpeciesFromSparqlQuery = () => {
        return plantRepository.getPlantSpeciesFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantsFromSpeciesFromSparqlQuery = (query) => {
        return plantRepository.getPlantsFromSpeciesFromSparqlQuery(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantDetailsFromSparqlQuery = (query) => {
        return plantRepository.getPlantDetailsFromSparqlQuery(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantSpeciesFromSeasonRecommendations = (query) => {
        return plantRepository.getPlantSpeciesFromSeasonRecommendations(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantsComments = (query) => {
        return plantRepository.getCommentToPlant(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    addCommentToPlant = (plantId, query) => {
        return plantRepository.addCommentToPlant(plantId, query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

export default new PlantService();