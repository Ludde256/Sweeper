import { useTheme, themes, type Theme } from "@/contexts/theme";
import { capitalize } from "@/utils";
import { Check, ChevronDown } from "lucide-react";

export function ThemePreview({ theme }: { theme: string }) {
	return (
		<div
			data-theme={theme}
			className="bg-base-100 border-base-content/15 grid shrink-0 grid-cols-2 gap-1 rounded-box border p-1 transition-colors"
		>
			<div className="bg-base-content size-1.5 rounded-box"></div>
			<div className="bg-primary size-1.5 rounded-box"></div>
			<div className="bg-secondary size-1.5 rounded-box"></div>
			<div className="bg-accent size-1.5 rounded-box"></div>
		</div>
	);
}

interface ThemeListProps {
	currTheme: Theme;
	setTheme: (theme: Theme) => void;
}

function ThemeList({ currTheme, setTheme }: ThemeListProps) {
	return (
		<ul tabIndex={0} className="flex flex-col pl-2 pb-2 w-64 h-[40vh] overflow-y-scroll">
			{themes.map((t) => (
				<li key={t} value={t}>
					<button onClick={() => setTheme(t)} className="btn btn-ghost justify-between w-full flex items-center">
						<div className="flex items-center gap-2">
							<ThemePreview theme={t} />
							<span className="font-mono">{capitalize(t)}</span>
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
			<button className="btn btn-ghost font-mono" title="Theme Picker">
				<ThemePreview theme={currTheme} />
				<span className="hidden sm:block">{capitalize(currTheme)}</span>
				<ChevronDown size={16} />
			</button>
			<div className="dropdown-content bg-base-200 mt-4 border border-base-300 rounded-box shadow-lg">
				<div className="w-full h-full px-4 pt-4">
					<span className="font-semibold text-sm">Theme Picker</span>
				</div>
				<div className="divider m-2"></div>
				<ThemeList currTheme={currTheme} setTheme={setTheme} />
			</div>
		</div>
	);
}
