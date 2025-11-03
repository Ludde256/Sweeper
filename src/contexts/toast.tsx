import { Toast as ToastComponent } from "@/components/toast";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const MAX_TOASTS = 10;
const TOAST_TIMEOUT = 5000;

export type ToastType = "success" | "warning" | "error";

type Toast = {
	id: number;
	type: ToastType;
	message: string;
};

export interface ToastContextValue {
	showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
	children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	// I've been told to optimize context especially because the compiler does not optimize much in this case.
	const dismissToast = useCallback(
		(id: number) => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		},
		[setToasts]
	);

	const showToast = useCallback(
		(type: ToastType, message: string) => {
			const id = Date.now();
			const toast: Toast = { id, type, message };

			setToasts((prev) => [...prev.slice(0, MAX_TOASTS - 1), toast]);

			setTimeout(() => dismissToast(id), TOAST_TIMEOUT);
		},
		[dismissToast]
	);

	const value = useMemo(() => ({ showToast }), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="toast z-[9999]">
				{toasts.map((toast) => (
					<ToastComponent
						key={toast.id}
						type={toast.type}
						message={toast.message}
						onDismiss={() => dismissToast(toast.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (ctx === undefined) {
		throw new Error("'useToastContext' is being used outside of context");
	}
	return ctx;
}
