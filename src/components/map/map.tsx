import L from "leaflet";

import { useLookups } from "@/hooks/useLookups";
import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

import { Recenter } from "./recenter";
import { FocusMarker } from "./focus";
import { useIsDarkTheme } from "@/contexts/theme";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";

export const DEFAULT_POS = [51.505, -0.09] as L.LatLngTuple; // London
export const DEFAULT_ZOOM = 10;

const DARK_MAP_URL = "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_MAP_URL = "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

type IpMarker = {
	latLng: L.LatLngTuple;
	Ip: string;
};

const customDivIcon = new L.DivIcon({
	className: "custom-map-marker", // You can style this class in your CSS
	html: renderToString(<MapPin size={32}></MapPin>),
	iconSize: [32, 32],
	iconAnchor: [16, 32], // Adjust for the bottom-center of your div
	popupAnchor: [0, -40],
});

export function Map() {
	const { lookups } = useLookups();
	const isDarkMode = useIsDarkTheme();

	const mapUrl = useMemo(() => (isDarkMode ? DARK_MAP_URL : LIGHT_MAP_URL), [isDarkMode]);

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
				attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://carto.com/attributions">CartoDB</a>'
				url={mapUrl}
			/>
			{markers.map((marker, index) => (
				<Marker
					key={`${marker.Ip}-${marker.latLng[0]}-${marker.latLng[1]}`}
					position={marker.latLng}
					icon={customDivIcon}
				>
					<Tooltip>
						<span>{lookups[index].query}</span>
					</Tooltip>
				</Marker>
			))}
			<Recenter positions={positions} />
			<FocusMarker />
		</MapContainer>
	);
}
