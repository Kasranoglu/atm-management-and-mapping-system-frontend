import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet varsayılan ikonlarını manuel olarak ayarlayın
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent ({atmData}) {
  const position = [39, 35];

  return (
    <div
      style={{
        height: "92vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "92vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          {atmData.map((data) => (
        <Marker key={data.id} position={[data.latitude,data.longitude]}>
          <Popup>{data.name}, {data.districtName}/{data.cityName}</Popup>
        </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
