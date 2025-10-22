import type { ToastType } from "@/contexts/toast";
import { CircleX, CircleAlert, CircleCheck } from "lucide-react";

interface IconProps {
	type: ToastType;
}

function Icon({ type }: IconProps) {
	switch (type) {
		case "success":
			return <CircleCheck className="text-success" />;
		case "warning":
			return <CircleAlert className="text-warning" />;
		case "error":
			return <CircleX className="text-error" />;
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
			{message}
		</button>
	);
}
