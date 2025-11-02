import { IpLookup } from "@/components/ipLookup";
import { useLookups } from "@/hooks/lookups";

export function LookupList() {
	const { lookups } = useLookups();

	return (
		<div className="flex flex-col h-full w-full overflow-y-scroll box p-4 gap-4">
			{lookups.map((lookup, index) => (
				<IpLookup key={index} lookup={lookup} />
			))}
		</div>
	);
}
