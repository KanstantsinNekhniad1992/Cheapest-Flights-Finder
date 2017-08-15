'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';

class TicketsRenderer extends React.Component {

	sortTickets(tickets) {

		let ticketsCopy = Object.assign([], tickets);

		return ticketsCopy.sort(function (first, second) {
			return first.price - second.price;
		});

	}

	render() {

		let tickets = this.sortTickets(this.props.tickets);

		return (
			<List>
				<Subheader><h2>Tickets</h2></Subheader>
				{tickets.map(ticket =>
					<ListItem
						key={ticket.dateFrom}
						primaryText={ticket.dateFrom}
						secondaryText= ''
						secondaryTextLines={2}
					/>
				)}
			</List>
		)
	}

}

TicketsRenderer.propTypes = {
	tickets: PropTypes.array
}

export default TicketsRenderer;