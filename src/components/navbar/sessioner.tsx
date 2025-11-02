import { Plus } from "lucide-react";

// This is all just for testing
type Session = {
	name: string;
	lookups: string[];
};

interface OptionProps {
	session: Session;
}

function Option({ session }: OptionProps) {
	return (
		<option>
			<div className="flex flex-col px-2">
				<span>{session.name}</span>
				{/* <div className="flex flex-col gap-1 bg-base-200" hidden={true}>
					{session.lookups.map((lookup) => (
						<span>{lookup}</span>
					))}
				</div> */}
			</div>
		</option>
	);
}

export function Sessioner() {
	const sampleSessions = [
		{
			name: "Session 1",
			lookups: ["192.168.1.1", "1.1.1.1", "google.com"],
		},
		{
			name: "Session 2",
			lookups: ["192.168.1.1", "1.1.1.1", "google.com"],
		},
		{
			name: "Session 3",
			lookups: ["192.168.1.1", "1.1.1.1", "google.com"],
		},
	];

	return (
		<div className="flex items-center h-full w-fit gap-2">
			<select defaultValue={sampleSessions[0].name} className="select w-3xs">
				{sampleSessions.map((session) => (
					<Option session={session} />
				))}
			</select>
			<button className="btn btn-primary">
				<Plus></Plus>
				New Session
			</button>
		</div>
	);
}
