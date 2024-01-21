import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";

export class plantRepository {
    /**
     * Get Plants from Species
     * @returns {Promise}
     *
     */
    static getPlants() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/plants`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            });
    }
}

