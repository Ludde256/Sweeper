import { useLookups } from "@/hooks/lookups";
import { useMemo } from "react";
import L, { type LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { Recenter } from "./recenter";

export const DEFAULT_POS = L.latLng(51.505, -0.09);
export const DEFAULT_ZOOM = 10;

export function Map() {
	const { lookups } = useLookups();

	const positions = useMemo(() => lookups.map((l) => [l.lat, l.lon] as LatLngTuple), [lookups]);

	return (
		<MapContainer center={DEFAULT_POS} zoom={DEFAULT_ZOOM} className="rounded-md w-full h-[20vh] md:h-full box">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{positions.map((pos, index) => (
				<Marker key={`${lookups[index].query}-${pos[0]}-${pos[1]}`} position={pos} />
			))}
			<Recenter positions={positions} />
		</MapContainer>
	);
}
