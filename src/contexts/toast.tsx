import { createContext, type ReactNode } from "react";

export type ToastTypes = "success" | "warning" | "error";

export type ToastFunction = (type: ToastTypes, message: string) => void;

const toastContext = createContext<ToastFunction | undefined>(undefined);

interface ToastContextProviderProps {
	children: ReactNode;
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
	const showToast = (type: ToastTypes, message: string) => {
		console.log("Showing toast");
		console.log(type);
		console.log(message);
	};

	return <toastContext.Provider value={showToast}>{children}</toastContext.Provider>;
}
