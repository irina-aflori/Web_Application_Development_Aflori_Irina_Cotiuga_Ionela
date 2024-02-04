import {eventRepository} from "../repositories/eventRepository";

class EventService {
    getEventsFromSparqlQuery = () => {
        return eventRepository.getEventsFromSparqlQuery()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    joinEvent = (eventId, person) => {
        return eventRepository.joinEvent(eventId, person)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getJoinedEventPersonsFromSparqlQuery = (eventId) => {
        return eventRepository.getJoinedEventPersonsFromSparqlQuery(eventId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    addFeedbackToEvent = (eventId, feedback) => {
        return eventRepository.addFeedbackToEvent(eventId, feedback)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
    getFeedbacksFromEvent = (eventId) => {
        return eventRepository.getFeedbacksFromEvent(eventId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
}
export default new EventService();