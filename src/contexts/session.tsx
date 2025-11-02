import { useLocalStorage } from "@/hooks/localstorage";
import type { IpLookupSuccess } from "@/services/ipApi";
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

export type Session = {
	id: string;
	createdAt: number;
	lookups: IpLookupSuccess[];
};

type UpdateSession = Partial<Omit<Session, "id" | "createdAt">>;

interface SessionContextValues {
	sessions: Session[];
	activeSession: Session;
	newSession(): void;
	deleteSession: (id: string) => void;
	setActiveSession: (id: string) => void;
	updateSession: (id: string, updates: UpdateSession) => void;
}

const SessionContext = createContext<SessionContextValues | undefined>(undefined);

function makeSession(): Session {
	return {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		lookups: [],
	};
}

export function SessionContextProvider({ children }: { children: ReactNode }) {
	const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", [makeSession()]);
	const [activeSessionId, setActiveSessionId] = useLocalStorage<string>("active_session_id", sessions[0].id);

	const activeSession = useMemo(
		() => sessions.find((s) => s.id === activeSessionId) || sessions[0],
		[sessions, activeSessionId]
	);

	const newSession = useCallback(() => {
		const session = makeSession();
		setSessions((prev) => [...prev, session]);
		setActiveSessionId(session.id);
	}, [setSessions, setActiveSessionId]);

	const deleteSession = useCallback(
		(id: string) => {
			if (sessions.length === 1) {
				throw new Error("Cannot delete the only session");
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

export function useSessionContext() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSessionContext must be used within SessionContextProvider");
	}
	return context;
}
