import { useIPLookupContext } from "@/contexts/ipLookup";
import { IpLookup } from "@/components/ipLookup";

export function LookupList() {
	const { lookups } = useIPLookupContext();

	return (
		<div className="flex flex-col outline h-full overflow-y-scroll">
			{lookups.map((lookup, index) => (
				<IpLookup key={index} lookup={lookup} />
			))}
		</div>
	);
}
