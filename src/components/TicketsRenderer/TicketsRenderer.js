'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import {normalizeDate} from "../../services/dateService";
import './styles.css';

class TicketsRenderer extends React.Component {

    sortTickets(tickets) {

        let ticketsCopy = Object.assign([], tickets);

        return ticketsCopy.sort(function (first, second) {
            return first.price - second.price;
        });

    }

    generateTicketsList({tickets = [], title}) {
        let listItems = [];
        let i = 0, len = tickets.length;

        if(!len) {
            return false;
        }

        tickets = this.sortTickets(tickets);

        for (i, len = tickets.length; i < len; i++) {
            const ticket = tickets[i];
            const primaryText = `From ${normalizeDate(ticket.dateFrom)} To ${normalizeDate(ticket.dateTo)}`;
            const secondaryText = `Price: ${ticket.currency} ${Math.floor(ticket.price)}`;

            listItems.push(
                <ListItem
                    key={ticket.dateFrom + i + ticket.dateTo}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    secondaryTextLines={1}
                />
            )
        }

        return (
            <div className="tickets-list-holder__list">
                <h3>{title}</h3>
                <List>
                    {listItems}
                </List>
            </div>
        );
    }

    render() {

        let {firstRoute = {}, secondRoute = {}} = this.props.tickets;

        return (
            <div className="tickets-list">
                <Subheader><h2>Tickets</h2></Subheader>
                {this.generateTicketsList({tickets: firstRoute.flights, title: 'Departures'})}
                {this.generateTicketsList({tickets: secondRoute.flights, title: 'Arrivals'})}
            </div>
        )
    }

}

TicketsRenderer.propTypes = {
    tickets: PropTypes.object
};

export default TicketsRenderer;