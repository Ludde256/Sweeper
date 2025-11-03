import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	// Read initial value synchronously before first render
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches;
		}
		return false;
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		// Set initial value (in case it changed between mount and effect)
		setMatches(mediaQuery.matches);

		// Listen for changes
		const handleChange = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}
