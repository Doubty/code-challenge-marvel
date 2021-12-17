import React from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { Grid } from "@mui/material";
import { Typography, Container } from "@mui/material";
import styles from "./styles.module.css";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries: any = ["places"];
const mapContainerStyle = {
	height: "70vh",
	width: "100%",
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};
const center = {
	lat: -5.18804,
	lng: -37.3441,
	//localização de Mossoró
};

export default function Map() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		/*eslint-disable */
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);
	const [selected, setSelected] = React.useState(null);

	const onMapClick = React.useCallback((e) => {
		setMarkers((current) => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	return (
		<>
			<Container maxWidth="lg">
				<Grid item xs={12}>
					<Typography
						variant="h4"
						noWrap
						align="center"
						component="div"
						sx={{ mb: 2, mt: 5, fontSize: { xs: "1.7rem", md: "2rem" } }}
					>
						Clique no mapa e selecione o endereço para entrega 📌
						<hr className={styles.line} />
					</Typography>
				</Grid>

				<GoogleMap
					id="map"
					mapContainerStyle={mapContainerStyle}
					zoom={7}
					center={center}
					options={options}
					onClick={onMapClick}
					onLoad={onMapLoad}
				>
					{markers.map((marker) => (
						<Marker
							key={`${marker.lat}-${marker.lng}`}
							position={{ lat: marker.lat, lng: marker.lng }}
							onClick={() => {
								setSelected(marker);
							}}
							icon={{
								url: "https://agiletrendsbr.com/2021/wp-content/uploads/2015/11/red-pin-hi.png",
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(20, 15),
								scaledSize: new window.google.maps.Size(40, 50),
							}}
						/>
					))}

					{selected ? (
						<InfoWindow
							position={{ lat: selected.lat, lng: selected.lng }}
							onCloseClick={() => {
								setSelected(null);
							}}
						>
							<div>
								<h2>
									<span role="img" aria-label="Entrega">
										📦
									</span>{" "}
									Local de entrega
								</h2>
								<p>Horário de agendamento {formatRelative(selected.time, new Date())}</p>
							</div>
						</InfoWindow>
					) : null}
				</GoogleMap>
			</Container>
		</>
	);
}
