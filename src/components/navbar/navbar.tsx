import { useDrawer } from "@/contexts/drawer";
import { PanelLeftOpen } from "lucide-react";
import { ThemePicker } from "./themePicker";

export function Navbar() {
	const { openDrawer } = useDrawer();

	return (
		<div className="flex items-center w-full box h-24 min-h-0 px-6">
			<div className="navbar-section justify-start w-1/3">
				<button
					className="btn btn-lg border border-base-300 btn-ghost px-2 gap-3"
					title="Session Drawer"
					onClick={openDrawer}
				>
					<PanelLeftOpen size={36} />
					<span className="font-mono text-base-content/70 hidden sm:block">Session Manager</span>
				</button>
			</div>
			<div className="navbar-section justify-center w-1/3">
				<h1 className="font-bold text-3xl">Sweeper</h1>
			</div>
			<div className="navbar-section justify-end w-1/3">
				<ThemePicker />
			</div>
		</div>
	);
}
