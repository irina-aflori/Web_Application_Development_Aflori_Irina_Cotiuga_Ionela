import {plantRepository} from "../repositories/plantRepository";

class PlantService {
    getPlants = (query) => {
        return plantRepository.getPlants(query)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

export default new PlantService();