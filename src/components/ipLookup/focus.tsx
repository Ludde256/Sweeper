import { MapPin } from "lucide-react";
import { setFocusMarker } from "@/components/map";

interface FocusMarkerProps {
	lat: number;
	lng: number;
}

export function FocusMarker({ lat, lng }: FocusMarkerProps) {
	return (
		<button onClick={() => setFocusMarker(lat, lng)} className="btn btn-square btn-soft btn-info">
			<MapPin size={28} />
		</button>
	);
}
