'use strict';

const AIROPORT_CODES_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';
const CHEAP_FLIGHTS_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/';
const headers = {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
};

class FlightsApi {

    static getAllFlights () {
	    let request = new Request(AIROPORT_CODES_URL, {
		    headers: headers
	    });

	    return fetch(request).then(response => {
		    return response.json();
	    }).then(json => {
		    return json;
	    }).catch(error => {
		    return error;
	    });
    }

    static getTickets(payload) {
        let {from, to, arrivalDate, departureDate, oneWayTicket} = payload;
        let url = `${CHEAP_FLIGHTS_URL}from/${from}/to/${to}/${departureDate}/${arrivalDate}/250/unique/`;
        let apiRequests = [];
        let data = {};

        let request = new Request(url, {
            headers: headers
        });

        let apiRequest1 = fetch(request).then(response => {
            return response.json();
        });
        apiRequests.push(apiRequest1);

        if (!oneWayTicket) {
            url = `${CHEAP_FLIGHTS_URL}from/${to}/to/${from}/${arrivalDate}/${arrivalDate}/250/unique/`;
            request = new Request(url, {
                headers: headers
            });
            let apiRequest2 = fetch(request).then(response => {
                return response.json();
            });
            apiRequests.push(apiRequest2);
        }

        return Promise.all(apiRequests).then(function (values) {
            data.firstRoute = values[0];
            if (!oneWayTicket) {
                data.secondRoute = values[1];
            }
            return data;
        });

    }

}

export default FlightsApi;