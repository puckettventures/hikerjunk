import React, { Component } from "react";
import { Input, Menu, Dropdown, Button, Icon } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown.js";

export default class MainMenu extends Component {
  handleOnClick = (e, data) => {
    // some action...
    // then redirect

    switch (data.color) {
      case "facebook":
        this.setState({ redirect: true, url: "/auth/facebook" });
        break;
    }
  };

  componentWillMount() {
    this.setState({ activeItem: "home", trails: [], redirect: false }); // redirect used to check for view navigation from buttons
  }

  componentDidMount() {
    if (this.props.user) {
      //user has logged in
      fetch("/api/user/" + this.props.user)
        .then(res => res.json())
        .then(user => {
          console.log(user);
          console.log("user");
          this.setState({ user: user[0] });
        });
    }
    // Get all of the stored trails using the trails rest call
    fetch("/api/trails")
      .then(res => res.json())
      .then(trails =>
        this.setState({ activeItem: this.state.activeItem, trails })
      );

    // open a web socket to know when there is a new or updated trail
    this.ws = new WebSocket("ws://localhost:2222/");
    this.ws.onmessage = e => {
      fetch("/api/trails")
        .then(res => res.json())
        .then(trails =>
          this.setState({ activeItem: this.state.activeItem, trails })
        );
    };
    this.ws.onerror = e => {
      console.log("error with websocket");
      console.error(e);
    };
  } // end of componentDidMount()

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleMapClick = (e, o) => {
    let id = o.value;
    fetch("/api/trails/" + id)
      .then(res => res.json())
      .then(trail => {
        this.setState({
          activeItem: this.state.activeItem,
          activeTrail: trail[0]
        });

        this.props.onMapChange(trail[0]);

        console.log(trail[0]);
      });
  };

  handleLoginClick = (e, data) => {
    this.setState({ redirect: true, url: "/login" });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.url} />;
    }

    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing>
          <Menu.Menu
            name="trails"
            active={activeItem === "trails" ? true : ""}
            onClick={this.handleItemClick}
          >
            <Dropdown item text="Trails">
              <Dropdown.Menu>
                {this.state.trails.map(trail => (
                  <Dropdown.Item
                    key={trail._id}
                    value={trail._id}
                    onClick={this.handleMapClick}
                  >
                    {trail.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Menu position="right">

              
            
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            {this.state.user && this.state.user.name ? (
                <ProfileDropDown UserName={this.state.user.name} />
              ) : (
                <Menu.Item><Button onClick={this.handleLoginClick}>Login</Button></Menu.Item>
              )}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
