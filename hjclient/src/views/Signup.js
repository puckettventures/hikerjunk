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

export default class Signup extends Component {
	handleOnClick = (e, data) => {
		

		switch (data.color)
		{
			case "facebook":
				this.setState({ redirect: true, url: "/auth/facebook" });
				break;

		}
		
	};

	componentWillMount (){
		this.setState({redirect: false})
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
						<Header as="h2" color="teal" textAlign="center">
							<Image src="images/water-marker.svg" /> Log-in to
							your account
						</Header>
						<Form size="large">
							<Segment stacked>
								<Form.Input
									fluid
									icon="mail"
									iconPosition="left"
									placeholder="E-mail address"
								/>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="Trail Name"
								/>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
								/>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Confirm Password"
									type="password"
								/>

								<Button color="teal" fluid size="large">
									Sign Up
								</Button>
							</Segment>
						</Form>
						<Message>
							Already have an account? <Link to="/login">Sign In</Link>
							<div className="social-login">
								<Button color="facebook" fluid onClick={this.handleOnClick}>
									<Icon name="facebook" /> Sign Up with
									Facebook
								</Button>
							</div>
							<div className="social-login">
								<Button color="twitter" fluid>
									<Icon name="twitter" /> Sign Up with Twitter
								</Button>
							</div>
							<div className="social-login">
								<Button color="google plus" fluid>
									<Icon name="google plus" /> Sign Up with
									Google Plus
								</Button>
							</div>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}
