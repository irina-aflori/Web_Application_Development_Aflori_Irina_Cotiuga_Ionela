import {markerRepository} from "../repositories/markerRepository";

class MarkerService {
    getMarkersFromSparqlQuery = () => {
        return markerRepository.getMarkersFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export default new MarkerService();