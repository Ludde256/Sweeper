export function formatThemeName(theme: string) {
	return theme
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
