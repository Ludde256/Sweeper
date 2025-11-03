import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePrefersDark } from "@/hooks/usePrefersDark";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

export const themes = [
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"coffee",
	"winter",
	"dim",
	"nord",
	"sunset",
	"caramellatte",
	"abyss",
	"silk",
];

export const darkThemes = [
	"dark",
	"synthwave",
	"halloween",
	"forest",
	"aqua",
	"black",
	"luxury",
	"dracula",
	"business",
	"night",
	"coffee",
	"dim",
	"sunset",
	"abyss",
];

export type Theme = (typeof themes)[number];

interface ToastContextValue {
	currTheme: Theme;
	setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ToastContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const prefersDark = usePrefersDark();

	const defaultTheme = useMemo<Theme>(() => (prefersDark ? "dark" : "light"), [prefersDark]);

	const [currTheme, setCurrTheme] = useLocalStorage<Theme>("theme", defaultTheme);

	useEffect(() => {
		if (!themes.includes(currTheme)) {
			// This gets rerun when currTheme is updated
			setCurrTheme(defaultTheme);
			return;
		}
		document.documentElement.setAttribute("data-theme", currTheme);
	}, [currTheme]);

	const setTheme = useCallback((newTheme: Theme) => setCurrTheme(newTheme), [setCurrTheme]);

	const value = useMemo(() => ({ currTheme, setTheme }), [currTheme, setTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

export function useIsDarkTheme() {
	const { currTheme } = useTheme();

	const value = useMemo(() => darkThemes.includes(currTheme), [currTheme]);

	return value;
}
