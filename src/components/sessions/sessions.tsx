import { useSession } from "@/contexts/session";
import { Plus } from "lucide-react";
import { Session } from "./session";
import { useMemo } from "react";

export function Sessioner() {
	const { sessions, activeSession, newSession, deleteSession, setActiveSession } = useSession();

	const sortedSessions = useMemo(() => sessions.sort((a, b) => b.createdAt - a.createdAt), [sessions]);

	const handleNewSession = () => {
		newSession();
	};

	return (
		<div className="flex flex-col h-full gap-4">
			<button className="btn btn-primary mt-4 mx-4" onClick={handleNewSession}>
				<Plus />
				New Session
			</button>
			<div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
				{sortedSessions.map((session) => (
					<Session
						key={session.id}
						isActive={activeSession.id === session.id}
						disableDelete={sessions.length <= 1}
						session={session}
						onActive={() => setActiveSession(session.id)}
						onDelete={() => deleteSession(session.id)}
					/>
				))}
			</div>
		</div>
	);
}
