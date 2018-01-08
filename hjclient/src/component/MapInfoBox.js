import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class MapInfoBox extends Component {
	componentDidCatch(error, info) {
		console.log("something went wrong");
	}

	componentDidUpdate() {}

	render() {
		return (
			<div
				style={{
					position: "relative",
					width: 300
				}}
			>
				<Card>
					<Card.Content>
						<Card.Header>{this.props.name}</Card.Header>
						<Card.Description
							dangerouslySetInnerHTML={{
								__html: this.props.desc
							}}
						/>
					</Card.Content>
				</Card>
			</div>
		);
	}
}
