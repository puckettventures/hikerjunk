import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import MainMenu from "./component/MainMenu.js";
import GoogleMap from "./component/GoogleMap.js";

class InfoBox {
  constructor(item) {
    this.lat = item.latLng.lat();
    this.lng = item.latLng.lng();
    this.name = item.feature.getProperty("name")
      ? item.feature.getProperty("name")
      : "";
    this.desc = item.feature.getProperty("desc")
      ? item.feature.getProperty("desc")
      : "";
  }
}

class App extends Component {
  state = { mapLoaded: false };

  /**
   * Process each point in a Geometry, regardless of how deep the points may lie.
   * @param {google.maps.Data.Geometry} geometry The structure to process
   * @param {function(google.maps.LatLng)} callback A function to call on each
   *     LatLng point encountered (e.g. Array.push)
   * @param {Object} thisArg The value of 'this' as provided to 'callback' (e.g.
   *     myArray)
   */

  processPoints = (geometry, callback, thisArg) => {
    let maps = this.state.maps;
    if (geometry instanceof maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      geometry.getArray().forEach(g => {
        this.processPoints(g, callback, thisArg);
      });
    }
  };

  /**
   * Update a map's viewport to fit each geometry in a dataset
   */

  zoom = () => {
    let bounds = this.state.bounds;
    let map = this.state.map;
    map.data.forEach(feature => {
      this.processPoints(feature.getGeometry(), bounds.extend, bounds);
    });
    map.fitBounds(bounds);
  };

  handleMapChange = selected => {
    let map = this.state.map;

    map.data.setStyle(feature => {
      // testing using different icons
      let desc = feature.getProperty("desc");
      if (desc) {
        return { icon: "./images/ic_pin_drop_black_24px.svg" };
      }
    });
    try {
      map.data.addGeoJson(selected.data);
      this.zoom();
      map.data.addListener("click", item => {

        // testing displaying info boxes with the item description and name 
        let infoBox = new InfoBox(item);
        this.setState({ infoBox: infoBox });
      });
    } catch (e) {
      console.log(e);
    }
  };

  
  render() {
    return (
      <div className="App">
        <MainMenu onMapChange={this.handleMapChange} />
        <GoogleMap
          onGoogleApiLoaded={({ map, maps }) => {
            this.setState({
              map: map,
              maps: maps,
              mapLoaded: true,
              bounds: new maps.LatLngBounds()
            });
            console.log(this.state);
          }}
          infoBox={this.state.infoBox}
        />
      </div>
    );
  }
}

export default App;
