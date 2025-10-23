import type { IpLookupSuccess } from "@/services/ipApi";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface IPLookupContextValue {
	lookups: IpLookupSuccess[];
	addLookup: (lookup: IpLookupSuccess) => void;
	deleteLookup: (ip: string) => void;
}

const ipLookupContext = createContext<IPLookupContextValue | undefined>(undefined);

export function IPLookupContextProvider({ children }: { children: React.ReactNode }) {
	const [lookups, setLookups] = useState<IpLookupSuccess[]>([]);

	const addLookup = useCallback(
		(lookup: IpLookupSuccess) => {
			setLookups((prev) => [lookup, ...prev]);
		},
		[setLookups]
	);

	const deleteLookup = useCallback(
		(ip: string) => {
			setLookups((prev) => prev.filter((lookup) => lookup.query !== ip));
		},
		[setLookups]
	);

	const value = useMemo(() => ({ lookups, addLookup, deleteLookup }), [lookups, addLookup, deleteLookup]);

	return <ipLookupContext.Provider value={value}>{children}</ipLookupContext.Provider>;
}

export function useIPLookupContext() {
	const context = useContext(ipLookupContext);
	if (!context) {
		throw new Error("useIPLookupContext must be used within a IPLookupContextProvider");
	}
	return context;
}
