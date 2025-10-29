import type { IpLookupSuccess } from "@/services/ipApi";
import { HostingBadge, MobileBadge, ProxyBadge } from "./badges";
import { GeoInfoBox, InternetInfoBox } from "./boxes";

interface IpLookupProps {
	lookup: IpLookupSuccess;
}

export function IpLookup({ lookup }: IpLookupProps) {
	return (
		<div className="outline rounded-field w-full p-1">
			<div className="flex flex-row justify-between w-md" style={{ width: "100%" }}>
				<h3>Searched IP: {lookup.query}</h3>
				<div className="flex flex-row gap-16">
					<ProxyBadge show={lookup.proxy} />
					<HostingBadge show={lookup.hosting} />
					<MobileBadge show={lookup.mobile} />
				</div>
			</div>
			<div className="flex flex-row">
				<GeoInfoBox lookup={lookup} />
				<InternetInfoBox lookup={lookup} />
			</div>
		</div>
	);
}
