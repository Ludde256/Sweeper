import { useDrawer } from "@/contexts/drawer";
import { useSession } from "@/contexts/session";
import { Plus } from "lucide-react";
import { Session } from "./session";
import { useMemo, useRef, useState, useEffect } from "react";

export function Sessioner() {
	const { closeDrawer } = useDrawer();
	const { sessions, activeSession, newSession, deleteSession, setActiveSession } = useSession();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	const sortedSessions = useMemo(() => sessions.sort((a, b) => b.createdAt - a.createdAt), [sessions]);

	useEffect(() => {
		const checkOverflow = () => {
			if (scrollRef.current) {
				const hasOverflow = scrollRef.current.scrollHeight > scrollRef.current.clientHeight;
				setIsOverflowing(hasOverflow);
			}
		};

		checkOverflow();

		// Re-check on window resize
		window.addEventListener("resize", checkOverflow);

		// Use ResizeObserver to detect content changes
		const resizeObserver = new ResizeObserver(checkOverflow);
		if (scrollRef.current) {
			resizeObserver.observe(scrollRef.current);
		}

		return () => {
			window.removeEventListener("resize", checkOverflow);
			resizeObserver.disconnect();
		};
	}, [sortedSessions]);

	const handleNewSession = () => {
		const ok = newSession();
		if (ok) {
			setTimeout(closeDrawer, 250);
		}
	};

	return (
		<div className="flex flex-col h-full gap-4">
			<button className="btn btn-primary" onClick={handleNewSession}>
				<Plus />
				New Session
			</button>
			<div ref={scrollRef} className={`flex flex-col gap-2 ${isOverflowing ? "pr-2" : ""} h-full overflow-y-auto`}>
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
