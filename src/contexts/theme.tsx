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
] as const;

export type Theme = (typeof themes)[number];

interface ToastContextValue {
	currTheme: Theme;
	setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ToastContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const prefersDark = usePrefersDark();

	const [currTheme, setCurrTheme] = useLocalStorage<Theme>("theme", prefersDark ? "dark" : "light");

	useEffect(() => {
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
