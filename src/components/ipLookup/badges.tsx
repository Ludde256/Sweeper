interface BadgeProps {
	show: boolean;
}

export function ProxyBadge({ show }: BadgeProps) {
	return (
		<div className="badge badge-soft badge-success" hidden={!show}>
			Proxy
		</div>
	);
}

export function HostingBadge({ show }: BadgeProps) {
	return (
		<div className="badge badge-soft badge-success" hidden={!show}>
			Hosting
		</div>
	);
}

export function MobileBadge({ show }: BadgeProps) {
	return (
		<div className="badge badge-soft badge-success" hidden={!show}>
			Mobile
		</div>
	);
}
