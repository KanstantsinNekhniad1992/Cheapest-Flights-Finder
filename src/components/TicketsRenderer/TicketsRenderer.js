'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import {normalizeDate} from "../../services/dateService"

class TicketsRenderer extends React.Component {

	sortTickets(tickets) {

		let ticketsCopy = Object.assign([], tickets);

		return ticketsCopy.sort(function (first, second) {
			return first.price - second.price;
		});

	}

	render() {
		let tickets = this.sortTickets(this.props.tickets);
		let listItems = [];
        let primaryText;
        let secondaryText;
		let ticket;
		let i = 0, len;

        for (i, len = tickets.length; i < len; i++) {

            ticket = tickets[i];
            primaryText = `From ${normalizeDate(ticket.dateFrom)} To ${normalizeDate(ticket.dateTo)}`;
            secondaryText = `Price: ${ticket.currency} ${Math.floor(ticket.price)}`;

            listItems.push(
				<ListItem
					key={ticket.dateFrom + ticket.dateTo}
					primaryText={primaryText}
					secondaryText={secondaryText}
					secondaryTextLines={1}
				/>
            )
        }

		return (
			<List>
				<Subheader><h2>Tickets</h2></Subheader>
				{listItems}
			</List>
		)
	}

}

TicketsRenderer.propTypes = {
	tickets: PropTypes.array
}

export default TicketsRenderer;