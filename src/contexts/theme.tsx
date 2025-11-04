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
	"purplewind",
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
	isDarkTheme: boolean;
	setTheme: (newTheme: Theme) => void;
	setDefaultTheme: () => void;
}

const ThemeContext = createContext<ToastContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const prefersDark = usePrefersDark();

	const defaultTheme = useMemo<Theme>(() => (prefersDark ? "dark" : "light"), [prefersDark]);

	const [currTheme, setCurrTheme] = useLocalStorage<Theme>("theme", defaultTheme);

	const isDarkTheme = useMemo(() => darkThemes.includes(currTheme), [currTheme]);

	// This is what applies the theme to the document
	useEffect(() => {
		// Do a check to ensure the theme is valid and set it to default if not
		if (!themes.includes(currTheme)) {
			setCurrTheme(defaultTheme);
			return;
		}

		document.documentElement.setAttribute("data-theme", currTheme);
	}, [currTheme]);

	const setTheme = useCallback((newTheme: Theme) => setCurrTheme(newTheme), [setCurrTheme]);

	const setDefaultTheme = useCallback(() => setCurrTheme(defaultTheme), [defaultTheme, setCurrTheme]);

	const value = useMemo(
		() => ({ currTheme, isDarkTheme, setTheme, setDefaultTheme }),
		[currTheme, isDarkTheme, setTheme, setDefaultTheme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
