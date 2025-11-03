import { useSession } from "@/contexts/session";
import { Plus, X } from "lucide-react";
import { Session } from "./session";
import { useMemo } from "react";
import { useDrawer } from "@/contexts/drawer";

export function Sessioner() {
	const { sessions, activeSession, newSession, deleteSession, setActiveSession } = useSession();

	const { closeDrawer } = useDrawer();

	const sortedSessions = useMemo(() => sessions.sort((a, b) => b.createdAt - a.createdAt), [sessions]);

	const handleNewSession = () => {
		newSession();
	};

	return (
		<div className="flex flex-col h-full w-full gap-4">
			<div className="flex items-center justify-between pt-4 px-4">
				<span className="font-bold text-lg">Session Manager</span>
				<button onClick={closeDrawer} className="btn btn-circle">
					<X />
				</button>
			</div>
			<button className="btn btn-primary mx-4" onClick={handleNewSession}>
				<Plus />
				New Session
			</button>
			<div className="divider m-0 mx-4" />
			<div className="flex flex-col gap-2 pb-4 px-4 h-full overflow-y-auto">
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
