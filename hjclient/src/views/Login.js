import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

export default class Login extends Component {
	render() {
		return (
			<Button onClick={this.buttonClick}>
				<Icon name="facebook official" />Login with Facebook
			</Button>
		);
	}
}
