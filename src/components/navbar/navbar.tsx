import { Sessioner } from "./sessioner";

export function Navbar() {
	return (
		<div className="flex justify-between items-center w-full box h-24 min-h-0 px-6">
			<h1 className="font-bold text-3xl">Sweeper</h1>
			<Sessioner />
		</div>
	);
}
