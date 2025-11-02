import { Sessioner } from "./sessions";

export function SessionDrawer() {
	return (
		<div className="flex flex-col bg-base-100 h-full w-fit min-w-96 px-4 pt-4">
			<Sessioner />
		</div>
	);
}
