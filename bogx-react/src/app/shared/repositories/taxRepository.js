import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class taxRepository {
    /**
     * Get Taxes
     * @returns {Promise}
     */
    static getTaxesFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/taxes`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
}