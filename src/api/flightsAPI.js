'use strict';

const AIROPORT_CODES_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';
const CHEAP_FLIGHTS_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/DUB/to/STN/2014-12-02/2015-02-02/250/unique/?limit=15&offset-0';

function getAllFlights () {

    let headers = {
        'Content-Type': 'application/json'
    };

    const request = new Request(AIROPORT_CODES_URL, {
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

export {
    getAllFlights
}