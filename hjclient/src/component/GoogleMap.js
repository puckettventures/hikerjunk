import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapInfoBox from "./MapInfoBox.js";

export default class GoogleMap extends Component {
  createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
    
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }

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
        options={this.createMapOptions}
        onGoogleApiLoaded={this.props.onGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals
      >
        <MapInfoBox
          lat={this.props.infoBox.lat}
          lng={this.props.infoBox.lng}
          name={this.props.infoBox.name}
          desc={this.props.infoBox.desc}
        />
      </GoogleMapReact>
    );
  }
}
