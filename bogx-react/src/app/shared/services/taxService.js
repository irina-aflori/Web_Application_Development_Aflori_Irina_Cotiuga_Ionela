import {taxRepository} from "../repositories/taxRepository";

class TaxService {
    getTaxesFromSparqlQuery = () => {
        return taxRepository.getTaxesFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export default new TaxService();