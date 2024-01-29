// import {FetchAdapter} from "../adapters/FetchAdapter";
// import {APP_CONFIG} from "../../../appConfig";
// import {helperService} from "../services/helperService";
//
// export class plantRepository {
//     /**
//      * Get Plants from Species
//      * @returns {Promise}
//      * @param query
//      */
//     static getPlants(query = {}) {
//         return FetchAdapter.request(
//             `${APP_CONFIG.URL.app}/plants${helperService.serialize(query)}`,
//             {
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
//     }
// }
//
