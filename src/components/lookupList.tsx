import { IpLookup } from "@/components/ipLookup";
import { useLookups } from "@/hooks/useLookups";

export function LookupList() {
	const { lookups } = useLookups();

	return (
		<div className="flex flex-col h-full w-full overflow-y-auto lg:overflow-y-scroll box p-4 gap-4">
			{lookups.map((lookup, index) => (
				<IpLookup key={index} lookup={lookup} />
			))}
			{lookups.length === 0 && (
				<div className="flex items-center justify-center size-full text-lg font-bold text-base-content/50">
					No lookups performed yet...
				</div>
			)}
		</div>
	);
}
