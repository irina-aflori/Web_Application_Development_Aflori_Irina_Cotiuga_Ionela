import {FetchAdapter} from "../adapters/FetchAdapter";
import {APP_CONFIG} from "../../../appConfig";
import {helperService} from "../services/helperService";
export class eventRepository {
    static getEventsFromSparqlQuery() {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/events`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }
    static joinEvent(eventId, person) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/events/${eventId}/join`,
            {
                method: 'PUT',
                body: JSON.stringify(person)
            });
    }
    static getJoinedEventPersonsFromSparqlQuery(eventId) {
        return FetchAdapter.request(
            `${APP_CONFIG.URL.app}/events/${eventId}`,
            {
                headers: {
                    'Accept': 'application/sparql-results+json'
                }
            });
    }

}
