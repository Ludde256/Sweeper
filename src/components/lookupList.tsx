import { IpLookup } from "@/components/ipLookup";
import { useSessionContext } from "@/contexts/session";
import { useMemo } from "react";

export function LookupList() {
	const { activeSession } = useSessionContext();

	const lookups = useMemo(() => activeSession.lookups, [activeSession]);

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
