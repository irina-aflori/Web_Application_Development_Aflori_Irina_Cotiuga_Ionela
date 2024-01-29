import {sparqlRepository} from "../repositories/sparqlRepository";

class SparqlService {
    getTaxesFromSparqlQuery = () => {
        return sparqlRepository.getTaxesFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantSpeciesFromSparqlQuery = () => {
        return sparqlRepository.getPlantSpeciesFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantsFromSpeciesFromSparqlQuery = (query) => {
        return sparqlRepository.getPlantsFromSpeciesFromSparqlQuery(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getMarkersFromSparqlQuery = () => {
        return sparqlRepository.getMarkersFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getPlantDetailsFromSparqlQuery = (query) => {
        return sparqlRepository.getPlantDetailsFromSparqlQuery(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

export default new SparqlService();