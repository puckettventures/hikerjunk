import React, { Component } from "react";
import { Input, Menu, Dropdown } from "semantic-ui-react";

export default class MainMenu extends Component {
  state = { activeItem: "home", trails: [] };

  componentDidMount() {
    fetch("/trails")
      .then(res => res.json())
      .then(trails =>
        this.setState({ activeItem: this.state.activeItem, trails })
      );
    this.ws = new WebSocket("ws://localhost:2222/");
    this.ws.onmessage = e => {
      fetch("/trails")
        .then(res => res.json())
        .then(trails =>
          this.setState({ activeItem: this.state.activeItem, trails })
        );
    };
    this.ws.onerror = e => {
      console.log("error with websocket");
      console.error(e);
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleMapClick = (e, o) => {
    let id = o.value;
    fetch("/trails/" + id)
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


  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name="home"
            active={activeItem === "home" ? true : ""}
            onClick={this.handleItemClick}
          />
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
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
