import { useMediaQuery } from "./useMediaQuery";

export function usePrefersDark(): boolean {
	return useMediaQuery("(prefers-color-scheme: dark)");
}
