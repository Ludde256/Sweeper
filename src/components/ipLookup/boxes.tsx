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
			<TextRow title="Region" text={`${lookup.region} (${lookup.regionName})`} />
			<TextRow title="City" text={`${lookup.city}`} />
			<TextRow title="Zip" text={`${lookup.zip}`} />
		</div>
	);
}

export function InternetInfoBox({ lookup }: InfoBoxProps) {
	return (
		<div className="w-full flex flex-col outline m-1 rounded-field">
			<TextRow title="ISP" text={`${lookup.isp}`} />
			<TextRow title="Organization" text={`${lookup.org}`} />
			<TextRow title="AS" text={`${lookup.as}`} />
			<TextRow title="ASName" text={`${lookup.asname}`} />
			<TextRow title="Reverse DNS" text={`${lookup.reverse}`} />
		</div>
	);
}
