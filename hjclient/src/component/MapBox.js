// ES6
import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicHVja2V0dHZlbnR1cmVzIiwiYSI6ImNqY2IyZ21ibDBsbjgzNG02NWk5bDJoY3gifQ.46sd6kVS5HGqzPdFdIHlvA"
});

const symbolPaint: MapboxGL.SymbolPaint = {
  //'text-color': 'black'
};
const circleLayout: MapboxGL.CircleLayout = {
  //visibility: 'visible'
};
const lineLayout: MapboxGL.LineLayout = {
  visibility: "visible",
 
  "line-join": "round"
};

export default class MapBox extends Component {
  render() {
    console.log("rendering map");
    console.log(this.props.geoLayer);

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "50vh",
          width: "100vw"
        }}
        center={[-116.4697, 32.6076]}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}
        />
        {this.props.geoLayer == null ? (
          ""
        ) : (
          <GeoJSONLayer
            data={this.props.geoLayer}
            symbolLayout={{
              
              "icon-image": "./images/info-marker.svg",
              "icon-anchor": "center",
              "text-field": "{name}",
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            }}
            symbolPaint={symbolPaint}
            lineLayout={lineLayout}
          />
        )}
      </Map>
    );
  }
}
