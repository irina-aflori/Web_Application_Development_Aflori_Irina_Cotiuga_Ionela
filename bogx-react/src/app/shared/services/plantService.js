import {plantRepository} from "../repositories/plantRepository";

class PlantService {
    getPlants = () => {
        return plantRepository.getPlants()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}

export default new PlantService();