// This component is purely responsible for *adding* the custom Leaflet control

import L from "leaflet";
import { MapPin } from "lucide-react";
import { useCallback, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { useMap, useMapEvent } from "react-leaflet";

import { DEFAULT_POS, DEFAULT_ZOOM } from "./map";

function recenter(map: L.Map, positions: L.LatLngTuple[]) {
	if (positions.length === 0) {
		map.setView(DEFAULT_POS, DEFAULT_ZOOM);
	} else if (positions.length === 1) {
		map.setView(positions[0], 13);
	} else {
		map.fitBounds(positions, { padding: [50, 50] });
	}
}

function RecenterControlWrapper({ positions }: { positions: L.LatLngTuple[] }) {
	const map = useMap(); // Get the Leaflet map instance

	useEffect(() => {
		const CustomRecenterControl = L.Control.extend({
			options: {
				position: "bottomleft",
			},

			onAdd: function (mapInstance: L.Map) {
				// Create the main container div for the control
				const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");

				// Create the actual button element (an 'a' tag for Leaflet consistency)
				const button = L.DomUtil.create("a", "", container);
				button.href = "#";
				button.title = "Recenter Map";
				button.role = "button";

				button.innerHTML = renderToString(<MapPin />);

				// Prevent click events from propagating to the map
				L.DomEvent.disableClickPropagation(container);
				L.DomEvent.on(button, "click", L.DomEvent.stop).on(
					button,
					"click",
					() => recenter(mapInstance, positions),
					this
				);

				return container;
			},
		});

		const control = new CustomRecenterControl();
		map.addControl(control);

		return () => {
			map.removeControl(control);
		};
	}, [map, positions]);

	return null;
}

export function Recenter({ positions }: { positions: L.LatLngTuple[] }) {
	const map = useMap();

	const handleRecenter = useCallback(() => recenter(map, positions), [map, positions]);

	useEffect(() => handleRecenter(), [handleRecenter]);

	useMapEvent("resize", handleRecenter);
	useMapEvent("load", handleRecenter);

	return <RecenterControlWrapper positions={positions} />;
}
