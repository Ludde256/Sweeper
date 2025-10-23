export function TimezoneFromOffset(offset: number): string {
	const gmt = offset > 0 ? "GMT+" : "GMT-";
	const offsetHours = offset / 3600;
	return `${gmt}${offsetHours}`;
}
