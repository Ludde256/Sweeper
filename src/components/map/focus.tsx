import { signal } from "@preact/signals-react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

// I could use the session context or something here. But this is simpler for now.
export const focusMarker = signal<L.LatLngTuple | undefined>(undefined);

// Sets the focus marker to the given lat/lng coordinates on the map.
export function setFocusMarker(lat: number, lng: number) {
	focusMarker.value = [lat, lng] as L.LatLngTuple;
}

export function FocusMarker() {
	const map = useMap();

	useEffect(() => {
		focusMarker.subscribe((newValue) => {
			if (newValue) {
				map.setView(newValue, 13);
			}
		});
	}, [map]);

	return null;
}
