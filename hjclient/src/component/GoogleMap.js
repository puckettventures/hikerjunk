import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const SimpleReactComponent = ({ name, desc }) => (
  <div className="map-info-box">
    <div className="name">{name}</div>
    <div className="desc">{desc}</div>
  </div>
);

export default class GoogleMap extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 1,
    infoBox: { lat: 0, lng: 0, name: "", desc: "" }
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        style={{ height: "600px", position: "relative" }}
        defaultZoom={this.props.zoom}
        bootstrapURLKeys={{
          key: "AIzaSyBTkQ-HVS6oELXofQbTX0aCv1t6TxUMPSA",
          language: "EN"
        }}
        onGoogleApiLoaded={this.props.onGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals
      >
        <SimpleReactComponent
          lat={this.props.infoBox.lat}
          lng={this.props.infoBox.lng}
          name={this.props.infoBox.name}
          desc={this.props.infoBox.desc}
        />
      </GoogleMapReact>
    );
  }
}
