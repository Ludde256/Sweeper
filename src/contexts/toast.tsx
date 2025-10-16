import { Toast as ToastComponent } from "@/components/toast";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const MAX_TOASTS = 10;
const TOAST_TIMEOUT = 5000;

export type ToastType = "success" | "warning" | "error";

type Toast = {
	id: string;
	type: ToastType;
	message: string;
};

export interface ToastContextValue {
	showToast: (type: ToastType, message: string) => void;
}

const toastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastContextProviderProps {
	children: ReactNode;
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	// I've been told to optimize context especially because the compiler does not optimize much in this case.
	const dismissToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const showToast = useCallback(
		(type: ToastType, message: string) => {
			const id = crypto.randomUUID() as string;
			const toast: Toast = { id, type, message };

			setToasts((prev) => [...prev.slice(0, MAX_TOASTS - 1), toast]);

			setTimeout(() => dismissToast(id), TOAST_TIMEOUT);
		},
		[dismissToast]
	);

	const value = useMemo(() => ({ showToast }), [showToast]);

	return (
		<toastContext.Provider value={value}>
			{children}
			<div className="toast">
				{toasts.map((toast) => (
					<ToastComponent
						key={toast.id}
						type={toast.type}
						message={toast.message}
						onDismiss={() => dismissToast(toast.id)}
					/>
				))}
			</div>
		</toastContext.Provider>
	);
}

export function useToastContext() {
	const ctx = useContext(toastContext);
	if (ctx === undefined) {
		throw new Error("'useToastContext' is being used outside of context");
	}
	return ctx;
}
