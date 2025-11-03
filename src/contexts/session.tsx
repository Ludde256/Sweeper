import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { IpLookupSuccess } from "@/services/ipApi";
import { randomName } from "@/utils";
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useToast } from "./toast";
import { v7 as uuidv7 } from "uuid";

export type Session = {
	id: string;
	name: string;
	createdAt: number;
	lookups: IpLookupSuccess[];
};

type UpdateSession = Partial<Omit<Session, "id" | "createdAt">>;

interface SessionContextValues {
	sessions: Session[];
	activeSession: Session;
	newSession(): boolean;
	deleteSession: (id: string) => void;
	setActiveSession: (id: string) => void;
	updateSession: (id: string, updates: UpdateSession) => void;
}

const SessionContext = createContext<SessionContextValues | undefined>(undefined);

function makeSession(): Session {
	return {
		id: uuidv7(),
		name: randomName(),
		createdAt: Date.now(),
		lookups: [],
	};
}

export function SessionProvider({ children }: { children: ReactNode }) {
	const { showToast } = useToast();

	const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", [makeSession()]);
	const [activeSessionId, setActiveSessionId] = useLocalStorage<string>("active_session_id", sessions[0].id);

	const activeSession = useMemo(
		() => sessions.find((s) => s.id === activeSessionId) || sessions[0],
		[sessions, activeSessionId]
	);

	const sessionsWithNoLookups = useMemo(() => sessions.filter((s) => s.lookups.length === 0), [sessions]);

	const newSession = useCallback(() => {
		if (activeSession.lookups.length === 0) {
			showToast("error", `Active session (${activeSession.name}) is empty.`);
			return false;
		}

		if (sessionsWithNoLookups.length > 0) {
			const session = sessionsWithNoLookups[0];
			showToast("warning", `Reusing "${session.name}" since it has no lookups...`);
			setActiveSessionId(session.id);
			return false;
		}

		const session = makeSession();
		setSessions((prev) => [...prev, session]);
		setActiveSessionId(session.id);
		return true;
	}, [activeSession.lookups.length, sessionsWithNoLookups, setSessions, setActiveSessionId]);

	const deleteSession = useCallback(
		(id: string) => {
			if (sessions.length === 1) {
				showToast("warning", "Cannot delete the only session");
				return;
			}

			setSessions((prev) => {
				const filtered = prev.filter((s) => s.id !== id);
				if (id === activeSessionId && filtered.length > 0) {
					setActiveSessionId(filtered[0].id);
				}
				return filtered;
			});
		},
		[sessions, activeSessionId, setSessions, setActiveSessionId]
	);

	const setActiveSession = useCallback(
		(id: string) => {
			// Make sure the session is in the sessions array
			if (sessions.some((s) => s.id === id)) {
				setActiveSessionId(id);
			}
		},
		[sessions, setActiveSessionId]
	);

	const updateSession = useCallback(
		(id: string, updates: UpdateSession) => {
			setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
		},
		[setSessions]
	);

	const value = useMemo(
		() => ({
			sessions,
			activeSession,
			newSession,
			deleteSession,
			setActiveSession,
			updateSession,
		}),
		[sessions, activeSession, newSession, deleteSession, setActiveSession, updateSession]
	);

	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSessionContext must be used within SessionContextProvider");
	}
	return context;
}
