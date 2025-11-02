import { useSessionContext } from "@/contexts/session";
import { useToastContext } from "@/contexts/toast";
import { FetchIpLookup, IsLookupSuccess } from "@/services/ipApi";
import { useCallback, useMemo } from "react";

export function useLookups() {
	const { activeSession, updateSession } = useSessionContext();
	const { showToast } = useToastContext();

	const lookups = useMemo(() => activeSession.lookups, [activeSession.lookups]);

	const addLookup = useCallback(
		async (ip: string) => {
			if (lookups.some((l) => l.query === ip)) {
				showToast("error", "Cannot add duplicate lookups");
				return;
			}

			const response = await FetchIpLookup(ip);

			if (IsLookupSuccess(response)) {
				const updatedSession = {
					lookups: [...lookups, response],
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
