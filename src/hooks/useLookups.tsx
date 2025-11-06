import { useSession } from "@/contexts/session";
import { useToast } from "@/contexts/toast";
import { FetchIpLookup, IsLookupSuccess } from "@/services/ipApi";
import { useCallback, useMemo } from "react";

export function useLookups() {
	const { activeSession, updateSession } = useSession();
	const { showToast } = useToast();

	const lookups = useMemo(() => activeSession.lookups, [activeSession.lookups]);

	const addLookup = useCallback(
		async (ip: string) => {
			const response = await FetchIpLookup(ip);

			if (IsLookupSuccess(response)) {
				if (lookups.some((l) => l.query === response.query)) {
					showToast("error", "Cannot add duplicate lookups");
					return;
				}

				const updatedSession = {
					lookups: [response, ...lookups],
				};

				updateSession(activeSession.id, updatedSession);
			} else {
				console.error(response);
				showToast("error", "API Fetch Failed. See Console.");
			}
		},
		[activeSession.id, lookups, showToast, updateSession]
	);

	const removeLookup = useCallback(
		(ip: string) => {
			const updatedSession = {
				lookups: lookups.filter((l) => l.query !== ip),
			};
			updateSession(activeSession.id, updatedSession);
		},
		[activeSession.id, lookups, updateSession]
	);

	return { lookups, addLookup, removeLookup };
}
