import { useIPLookupContext } from "@/contexts/ipLookup";
import { IpLookup } from "@/components/ipLookup";

export function LookupList() {
	const { lookups } = useIPLookupContext();

	return (
		<div className="flex flex-col h-full overflow-y-scroll box p-4 gap-4">
			{lookups.map((lookup, index) => (
				<IpLookup key={index} lookup={lookup} />
			))}
			<div className="w-full h-full flex items-center justify-center">
				<p>IP Lookup List</p>
			</div>
		</div>
	);
}
