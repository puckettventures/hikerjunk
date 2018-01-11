import React, { Component } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import WebSocket from "ws";


export default class TrailsDropdown extends Component {
	state = { trails: [] };

	componentDidMount() {
		fetch("/api/trails")
			.then(res => res.json())
			.then(trailss => this.setState({ trailss }));
		this.ws = new WebSocket("ws://localhost:2222/");
		this.ws.onmessage = e => {
			fetch("/api/trails")
				.then(res => res.json())
				.then(trailss => this.setState({ trailss }));
		};
		this.ws.onerror = e => {
			console.log("error with websocket");
			console.error(e);
		};
	}


	 componentWillUnmount() {
	    this.ws.close();
	  }

	render() {
		return (
		<Menu compact>
			<Dropdown text="Trails"  >
				{this.state.trails.map(trail => (
					<Dropdown.Item key={trail.name} value={trail._id}>
						{trail.name}
					</Dropdown.Item>
				))}
			</Dropdown>
		</Menu>);
	}
}


