import { useSessionContext, type Session } from "@/contexts/session";
import { Plus } from "lucide-react";

interface OptionProps {
	session: Session;
}

function Option({ session }: OptionProps) {
	return <option value={session.id}>{session.id}</option>;
}

export function Sessioner() {
	const { sessions, activeSession, newSession, setActiveSession } = useSessionContext();

	const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setActiveSession(e.target.value);
	};

	return (
		<div className="flex items-center h-full w-fit gap-2">
			<select value={activeSession.id} onChange={handleSessionChange} className="select w-3xs">
				{sessions.map((session) => (
					<Option key={session.id} session={session} />
				))}
			</select>
			<button onClick={newSession} className="btn btn-primary">
				<Plus></Plus>
				New Session
			</button>
		</div>
	);
}
