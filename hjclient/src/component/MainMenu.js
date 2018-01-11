import React, { Component } from "react";
import { Input, Menu, Dropdown, Button, Icon } from "semantic-ui-react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class MainMenu extends Component {
  state = { activeItem: "home", trails: [] };

  componentDidMount() {
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

  handleFBLoginClick = (e, o) => {
    /*window.FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        console.log("Logged in.");
      } else {
        window.FB.login();
        console.log("Attempting login.");
      }
    }); */

    fetch("/api/health-check", {
      mode: "cors"
    }).then(res => console.log(res));
  };

  render() {
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
          <a href="/auth/facebook">login</a>
          <Button onClick={this.handleFBLoginClick}>clicked </Button>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
