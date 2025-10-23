import type { IpLookupSuccess } from "@/services/ipApi";

interface IpPropertyProps {
	show: boolean;
}

function ProxyBadge({ show }: IpPropertyProps) {
	return <div className="outline p-0.5 "></div>;
}

function HostingBadge({ show }: IpPropertyProps) {
	return <div className="badge badge-soft badge-success">Success</div>;
}

function MobileBadge({ show }: IpPropertyProps) {
	return <div className="outline p-0.5"></div>;
}

interface InfoBoxProps {
	lookup: IpLookupSuccess;
}

function InfoBox({ lookup }: InfoBoxProps) {
	return (
		<div className="w-full outline m-1 rounded-field">
			<p>
				{lookup.continent}
				{lookup.continentCode}
				{lookup.country}
				{lookup.countryCode}
				{lookup.timezone}
				{lookup.offset}
				{lookup.regionName}
				{lookup.region}
				{lookup.city}
				{lookup.zip}
			</p>
		</div>
	);
}

interface IpLookupProps {
	lookup: IpLookupSuccess;
}

export function IpLookup({ lookup }: IpLookupProps) {
	return (
		<div className="outline rounded-field w-3/4 p-1">
			<div className="flex flex-row justify-between w-md" style={{ width: "100%" }}>
				{/* IP-Adress to be put in h3 */}
				<h3>0.0.0.0</h3>
				<div className="flex flex-row gap-16">
					<ProxyBadge show={lookup.proxy} />
					<HostingBadge show={lookup.hosting} />
					<MobileBadge show={lookup.mobile} />
				</div>
			</div>
			<div className="flex flex-row"></div>
		</div>
	);
}
