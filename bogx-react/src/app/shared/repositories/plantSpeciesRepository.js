import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class plantSpeciesRepository {
    /**
     * Get Plant Species
     * @returns {Promise}
     */
    static getPlantSpecies() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/plantSpecies`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            });
    }
}

