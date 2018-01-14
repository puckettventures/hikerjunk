import React, { Component } from "react";
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
	Icon
} from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";

// Taken directly from https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/app/Layouts/LoginLayout.js
// With modifications..

export default class Login extends Component {
	handleLogoutClick = (e, data) => {
		this.setState({ redirect: true, url: "/" });
	};

	componentWillMount() {
		this.setState({ redirect: false });
	}

	render() {
		if (this.state.redirect) {
			
			return <Redirect push to={this.state.url} />;
		}
		return (
			<div className="login-form">
				{/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
				<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
				<Grid
					textAlign="center"
					style={{ height: "100%" }}
					verticalAlign="middle"
				>
					<Grid.Column style={{ maxWidth: 350 }}>
						<Header as="h1" color="black" textAlign="center">
							<Image
								src="images/water-marker.svg"
								style={{ maxWidth: "32px" }}
							/>
							HikerJunk
						</Header>
						<Header as="h2" color="teal" textAlign="center">
							Are you sure you want to logout?
						</Header>

						<Button
							color="orange"
							fluid
							size="large"
							onClick={this.handleLogoutClick}
						>
							Yes
						</Button>
						<div>&nbsp;</div>
						<Button
							color="red"
							fluid
							size="large"
							onClick={this.props.history.goBack}
						>
							No
						</Button>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}
