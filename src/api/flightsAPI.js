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
	    let {from, to, arrivalDate, departureDate} = payload;
	    let url = CHEAP_FLIGHTS_URL + 'from/' + from + '/to/' + to + '/' + departureDate + '/' + arrivalDate + '/250/unique/?limit=15&offset-0';

	    let request = new Request(url, {
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

}

export default FlightsApi;