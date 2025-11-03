// import { Sessioner } from "./sessioner";
import { useDrawer } from "@/contexts/drawer";
import { Menu } from "lucide-react";

export function Navbar() {
	const { toggleDrawer } = useDrawer();

	return (
		<div className="flex justify-between items-center w-full box h-24 min-h-0 px-6">
			<div className="flex items-center gap-4">
				<button className="btn btn-ghost btn-square" aria-label="Session Drawer" onClick={toggleDrawer}>
					<Menu size={32} />
				</button>
				<h1 className="font-bold text-3xl">Sweeper</h1>
			</div>
		</div>
	);
}
