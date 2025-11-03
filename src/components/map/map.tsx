import L from "leaflet";
import { useLookups } from "@/hooks/lookups";
import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

import { Recenter } from "./recenter";

export const DEFAULT_POS = [51.505, -0.09] as L.LatLngTuple; // London
export const DEFAULT_ZOOM = 10;

type IpMarker = {
	latLng: L.LatLngTuple;
	Ip: string;
};

export function Map() {
	const { lookups } = useLookups();

	const markers: IpMarker[] = useMemo(
		() =>
			lookups.map((l) => {
				return {
					latLng: [l.lat, l.lon] as L.LatLngTuple,
					Ip: l.query,
				};
			}),
		[lookups]
	);

	const positions = useMemo(() => markers.map((marker) => marker.latLng), [markers]);

	return (
		<MapContainer
			center={DEFAULT_POS}
			zoom={DEFAULT_ZOOM}
			className="z-0 rounded-md w-full h-[30vh] lg:flex-1 lg:h-full box"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{markers.map((marker, index) => (
				<Marker key={`${marker.Ip}-${marker.latLng[0]}-${marker.latLng[1]}`} position={marker.latLng}>
					<Tooltip>
						<span>{lookups[index].query}</span>
					</Tooltip>
				</Marker>
			))}
			<Recenter positions={positions} />
		</MapContainer>
	);
}
