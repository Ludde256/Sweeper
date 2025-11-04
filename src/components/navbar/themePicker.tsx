import { useTheme, themes, type Theme } from "@/contexts/theme";
import { formatThemeName } from "@/utils";
import { Check, ChevronDown, RotateCcw } from "lucide-react";

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
			{themes.map((theme) => (
				<li key={theme} value={theme}>
					<button onClick={() => setTheme(theme)} className="btn btn-ghost flex w-full justify-between items-center">
						<div className="flex items-center gap-2">
							<ThemePreview theme={theme} />
							<span className="font-mono">{formatThemeName(theme)}</span>
						</div>
						{/* The little only get rendered when this is the selected theme */}
						{currTheme === theme && <Check size={18} strokeWidth={3} />}
					</button>
				</li>
			))}
		</ul>
	);
}

export function ThemePicker() {
	const { currTheme, setTheme, setDefaultTheme } = useTheme();

	return (
		<div className="dropdown dropdown-end">
			<button className="btn btn-ghost border border-base-300" title="Theme Picker">
				<ThemePreview theme={currTheme} />
				<span className="font-mono text-base-content/70 hidden sm:block">{formatThemeName(currTheme)}</span>
				<ChevronDown size={16} />
			</button>
			<div className="dropdown-content bg-base-200 mt-4 border border-base-300 rounded-box shadow-lg">
				<div className="w-full h-full flex items-center justify-between px-4 pt-4">
					<span className="font-semibold text-sm">Theme Picker</span>
					<button title="Reset Theme" onClick={setDefaultTheme} className="btn btn-sm btn-circle">
						<RotateCcw size={18} />
					</button>
				</div>
				<div className="divider m-2"></div>
				<ThemeList currTheme={currTheme} setTheme={setTheme} />
			</div>
		</div>
	);
}
