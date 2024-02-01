import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class markerRepository {
    /**
     * Get Markers
     * @returns {Promise}
     */
    static getMarkersFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/markers`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }

}