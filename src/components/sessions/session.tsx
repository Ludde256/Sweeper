import { type Session } from "@/contexts/session";
import { useInterval } from "@/hooks/useInterval";
import { formatRelativeDate } from "@/utils";
import { Trash2 } from "lucide-react";
import { use, useMemo, useState } from "react";

interface SessionProps {
	isActive: boolean;
	disableDelete: boolean;
	session: Session;
	onActive: () => void;
	onDelete: () => void;
}

export function Session({ isActive, disableDelete, session, onActive, onDelete }: SessionProps) {
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete();
	};

	return (
		<div
			tabIndex={0}
			role="button"
			onClick={onActive}
			className={`flex items-center justify-between p-4 rounded-box border-2 transition-all cursor-pointer shadow hover:shadow-md ${
				isActive ? "border-primary bg-primary/10" : "border-base-300 bg-base-200"
			}`}
		>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-lg">{session.name}</span>
					{isActive && <span className="badge badge-primary badge-sm">Active</span>}
				</div>
				<div className="flex items-center gap-2 text-sm opacity-70">
					<span>{formatRelativeDate(session.createdAt)}</span>
					<span>•</span>
					<span>
						{session.lookups.length} lookup{session.lookups.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>
			<button
				onClick={handleDelete}
				className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/20"
				aria-label="Delete session"
				hidden={disableDelete}
			>
				<Trash2 size={18} />
			</button>
		</div>
	);
}
