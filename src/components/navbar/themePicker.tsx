import { useTheme, themes, type Theme } from "@/contexts/theme";
import { capitalize } from "@/utils";
import { Check } from "lucide-react";

export function ThemePreview({ theme }: { theme: string }) {
	return (
		<div
			data-theme={theme}
			className="bg-base-100 border-base-content/20 grid grid-cols-2 gap-0.5 rounded-box border p-1"
		>
			<div className="bg-base-content size-1 rounded-full" /> <div className="bg-primary size-1 rounded-full" />
			<div className="bg-secondary size-1 rounded-full" /> <div className="bg-accent size-1 rounded-full" />
		</div>
	);
}

interface ThemeListProps {
	currTheme: Theme;
	setTheme: (theme: Theme) => void;
}

function ThemeList({ currTheme, setTheme }: ThemeListProps) {
	return (
		<ul tabIndex={0} className="flex flex-col pl-4 pb-2 w-64 h-[40vh] overflow-y-scroll">
			{themes.map((t) => (
				<li key={t} value={t}>
					<button onClick={() => setTheme(t)} className="btn btn-ghost justify-between w-full flex items-center">
						<div className="flex items-center gap-2">
							<ThemePreview theme={t} />
							<span>{capitalize(t)}</span>
						</div>
						{currTheme === t && <Check size={18} strokeWidth={3} />}
					</button>
				</li>
			))}
		</ul>
	);
}

export function ThemePicker() {
	const { currTheme, setTheme } = useTheme();

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn gap-2" aria-label="Theme Picker">
				<ThemePreview theme={currTheme} />
				<span>{capitalize(currTheme)}</span>
			</div>
			<div className="dropdown-content bg-base-200 mt-4 border border-base-300 rounded-box shadow-lg">
				<div className="w-full h-full px-4 pt-4">
					<span className="font-semibold text-sm">Theme Picker</span>
				</div>
				<div className="divider my-2 mx-4"></div>
				<ThemeList currTheme={currTheme} setTheme={setTheme} />
			</div>
		</div>
	);
}
