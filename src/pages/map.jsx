import React, {useEffect, useState} from "react";
import MapComponent from "../components/mapComponent.jsx";
import axios from "axios";
import Box from "@mui/material/Box";

export default function Map() {
    const [atmData, setAtmData] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7217/api/atm-machine/list')
            .then(response => {
                setAtmData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[] );

return (
    <Box>
        <MapComponent atmData={atmData}/>
    </Box>
);
}

