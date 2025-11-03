import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		// Set initial value
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

// Helper hooks for common Tailwind breakpoints
export function useIsMobile() {
	return useMediaQuery("(max-width: 767px)"); // < md
}

export function useIsTablet() {
	return useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // md to lg
}

export function useIsDesktop() {
	return useMediaQuery("(min-width: 768px)"); // >= md
}
