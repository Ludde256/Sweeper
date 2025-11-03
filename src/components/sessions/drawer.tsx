import { Sessioner } from "./sessions";

export function SessionDrawer() {
	return (
		<div className="flex flex-col bg-base-100 h-full w-full sm:w-fit min-w-96">
			<Sessioner />
		</div>
	);
}
