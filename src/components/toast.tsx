import type { ToastType } from "@/contexts/toast";
import { CircleX, CircleAlert, CircleCheck } from "lucide-react";

const ICON_SIZE = 24;

interface IconProps {
	type: ToastType;
}

function Icon({ type }: IconProps) {
	switch (type) {
		case "success":
			return <CircleCheck size={ICON_SIZE} className="text-success" />;
		case "warning":
			return <CircleAlert size={ICON_SIZE} className="text-warning" />;
		case "error":
			return <CircleX size={ICON_SIZE} className="text-error" />;
	}
}

interface ToastProps {
	type: ToastType;
	message: string;
	onDismiss: () => void;
}

export function Toast({ type, message, onDismiss }: ToastProps) {
	return (
		<button onClick={onDismiss} className="alert cursor-pointer">
			<Icon type={type} />
			<span className="font-semibold text-md">{message}</span>
		</button>
	);
}
