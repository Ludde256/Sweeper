import type { IpLookupSuccess } from "@/services/ipApi";
import { TimezoneFromOffset } from "./utils";

interface TextRowProps {
	title: string;
	text: string;
}

function TextRow({ title, text }: TextRowProps) {
	return (
		<div className="flex gap-2 items-start">
			<span className="font-bold">{title}</span>
			<span className="font-semibold">{text}</span>
		</div>
	);
}

interface InfoBoxProps {
	lookup: IpLookupSuccess;
}

export function GeoInfoBox({ lookup }: InfoBoxProps) {
	return (
		<div className="w-full flex flex-col outline m-1 rounded-field">
			<TextRow title="Continent" text={`${lookup.continent} (${lookup.continentCode})`} />
			<TextRow title="Country" text={`${lookup.country} (${lookup.countryCode})`} />
			<TextRow title="Timezone" text={`${lookup.timezone} (${TimezoneFromOffset(lookup.offset)})`} />
			{/* {lookup.regionName}
			{lookup.region}
			{lookup.city}
			{lookup.zip} */}
		</div>
	);
}

export function InternetInfoBox({ lookup }: InfoBoxProps) {
	return (
		<div className="w-full flex flex-col outline m-1 rounded-field">
			{lookup.isp}
			{lookup.org}
			{lookup.as}
			{lookup.asname}
			{lookup.reverse}
		</div>
	);
}
