export function formatRelativeDate(date: number): string {
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Just now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) return `${diffDays}d ago`;

	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
	});
}

export function formatDateTime(date: number): string {
	const d = new Date(date);
	return d.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
